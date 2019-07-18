#!/usr/bin/env ruby
require 'pathname'
require 'yaml'
require 'json'

def data_dir
  Pathname.new(__FILE__).join('../../')
end

def load_products
  product_type_defs = YAML.load_file(data_dir.join('productTypeDefinitions.yaml'))
  product_type_names = product_type_defs.map {|pt| pt['type']}
  products = product_type_names.reduce({}) do |accum, product_type_name|
    path = data_dir.join("#{product_type_name}.yaml")
    accum[product_type_name] = YAML.load_file(path)
    accum
  end
  { productTypeDefinitions: product_type_defs }.merge(products)
end

def write(products)
  path = data_dir.join('products.json')
  File.write(path, products.to_json)
end

def main
  data_dir
  products = load_products
  write(products)
end

if __FILE__ == $0
  main
end
