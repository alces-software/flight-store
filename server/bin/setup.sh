#!/bin/bash

#==============================================================================
# Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
#
# This file is part of Alces Store.
#
# All rights reserved, see LICENSE.txt.
#==============================================================================
set -eu
set -o pipefail

ALLOW_REMOTE_GEMS=false
REPO_ROOT="$(git rev-parse --show-toplevel)"
SERVER_ROOT="${REPO_ROOT}/server"

main() {
    parse_arguments "$@"
    check_dependencies
    setup
}

setup() {
    header "Preparing to build docker containers"
    cd "${SERVER_ROOT}"
    # subheader "Creating config/foreman/local.dev.env file (if it doesn't exist)"
    # cp -an config/foreman/dev.env config/foreman/local.dev.env

    header "Building docker containers"
    export USER_ID=$(id -u)
    export GROUP_ID=$(id -g)
    docker-compose build 2> >(indent 1>&2) | indent

    header "Starting database container"
    docker-compose up -d db 2> >(indent 1>&2) | indent
    sleep 5   # Give the database a chance to start.

    local install_gems_args
    install_gems_args=( "${install_gems_args[@]-}" )
    if $ALLOW_REMOTE_GEMS ; then
        install_gems_args+=" --remote-gems"
    fi
    "${SERVER_ROOT}"/bin/install-gems ${install_gems_args[@]}

    header "Setting up database"
    docker-compose run --rm store-api rake db:setup  | indent

    header "Starting docker containers"
    docker-compose up store-api 2> >(indent 1>&2) | indent

    # Make sure the prompt isn't indented.
    echo
}

usage() {
    echo "Usage: $(basename $0) [--remote-gems]"
    echo
    echo "Build and start the docker containers."
    echo
    echo "If --remote-gems is given gems will be downloaded from the internet where needed."
    echo "Otherwise they will have to be cached."
}


check_dependencies() {
    type -p docker > /dev/null || { echo "Please install docker and docker-compose" ; exit 1; }
    type -p docker-compose > /dev/null || { echo "Please install docker-compose" ; exit 1; }
}

parse_arguments() {
    while [[ $# > 0 ]] ; do
        key="$1"

        case $key in
            --remote-gems)
                ALLOW_REMOTE_GEMS=true
                shift
                ;;

            --help)
                usage
                exit 0
                ;;

            *)
                echo "$(basename $0): unrecognized option ${key}"
                usage
                exit 1
                ;;
        esac
    done
}

header() {
    echo -e "\n>>> $@ <<<"
}

subheader() {
    echo -e " ---> $@"
}

indent() {
    sed 's/^/  /'
}

main "$@"
