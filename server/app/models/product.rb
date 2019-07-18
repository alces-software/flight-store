require 'open-uri'

class Product
  include ActiveModel::Model

  class Error < RuntimeError ; end
  class RetrievalError < Error ; end
  class NotValid < Error ; end
  class NotFound < Error ; end

  def self.load!(filename, type, identifier)
    url = "#{Rails.application.config.store[:products_url_prefix]}#{filename}"
    Rails.logger.info("Retrieving products definitions from #{url.inspect}")
    begin
      definitions = JSON.parse(open(url).read)[type]
    rescue OpenURI::HTTPError
      raise RetrievalError, $!.message
    rescue JSON::ParserError
      raise NotValid
    end
    definition = definitions.detect do |p|
      p['identifier'] == identifier
    end
    if definition.nil?
      raise NotFound
    end
    Product.new(
      name: definition['name'],
      stripe_params: StripeParams.new(definition['stripe']),
      action: Action.new(definition['action']),
    ).tap do |product|
      unless product.valid?
        raise Product::NotValid, product.errors.full_messages.join(', ')
      end
    end
  end

  class StripeParams
    include ActiveModel::Model

    attr_accessor :amount, :currency, :description, :type

    validates :amount,
      presence: true,
      numericality: {
        only_integer: true,
        greater_than_or_equal_to: 0
      }

    validates :currency,
      presence: true,
      inclusion: { within: %w(gbp)}

    validates :description,
      presence: true

    validates :type,
      presence: true,
      inclusion: { within: %w(charge) }

    def amount_with_vat
      vat_rate = Rails.application.config.store[:vat_rate]
      percentage = vat_rate / 100.0
      vat = ( amount * percentage ).ceil
      Rails.logger.info(
        "Charging #{amount / 100}#{currency.upcase} NET " \
        "+ VAT@#{vat_rate} (#{vat / 100}#{currency.upcase}) " \
        "= #{(amount + vat) / 100}#{currency.upcase} Total"
      )
      amount + vat
    end
  end

  class Action
    include ActiveModel::Model

    attr_accessor :identifier, :amount
    attr_reader :flash, :redirect_url

    validates :identifier,
      presence: true,
      inclusion: { within: %w(no_op) }

    validates :amount,
      presence: true,
      numericality: {
        only_integer: true,
        greater_than_or_equal_to: 0
      }

    def call(charge, user)
      case identifier
      when 'no_op'
        # This is the NoOp handler.  So we do nothing.  A real app would want
        # to do something and set a flash message and the redirect_url.
        @flash = ->() { nil }
        @redirect_url = ->() { nil }
      end
    end

    def flash
      @flash&.call
    end

    def redirect_url
      @redirect_url&.call
    end
  end

  attr_accessor :name, :stripe_params, :action

  validates :name, presence: true
  validates :stripe_params, presence: true
  validates :action, presence: true
  validate :associations_are_valid

  def initialize(params={})
    super
    if stripe_params.is_a?(Hash)
      self.stripe_params = StripeParams.new(stripe_params)
    end
    if action.is_a?(Hash)
      self.action = Action.new(action)
    end
  end

  private

  def associations_are_valid
    [:stripe_params, :action].each do |attribute|
      if send(attribute).present? && !send(attribute).valid?
        errors.add(attribute, :invalid, value: send(attribute))
      end
    end
  end
end

