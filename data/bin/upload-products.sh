#!/bin/bash

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"

main() {
    parse_arguments "$@"
    header "Uploading"
    upload
}

upload() {
    local 
    aws s3 cp \
        --acl public-read \
        "${LOCAL_FILE}" \
        "${S3_PREFIX}${S3_FILE_NAME}"
}

header() {
    echo -e "=====> $@"
}

subheader() {
    echo -e "-----> $@"
}

indent() {
    sed 's/^/       /'
}

usage() {
    echo "Usage: $(basename $0) [options]"
    echo
    echo "Upload products json to cloud storage"
    echo
    echo -e "      --s3-file NAME\t\tUpload to NAME."
    echo -e "      --local-file PATH\t\tThe path to JSON products file to upload."
    echo -e "      --production PATH\t\tUpload to the production bucket."
    echo -e "      --staging PATH\t\tUpload to the staging bucket."
    echo -e "      --help\t\t\tShow this help message"
    echo
    echo "Examples:"
    echo
    echo "Upload the default products file to the default cloud location."
    echo 
    echo -e "\t$(basename $0)"
    echo
    echo -e "Upload the default products file to the cloud file\n\`${S3_PREFIX}test.json'."
    echo 
    echo -e "\t$(basename $0) --s3-file test.json"
    echo
    echo "Upload the products file \`./my/products.json' to the default cloud location."
    echo 
    echo -e "\t$(basename $0) --local-file ./my/products.json"
}

S3_PREFIX=s3://alces-flight/FlightStore/development-products/
S3_FILE_NAME=default.json
LOCAL_FILE="${REPO_ROOT}/data/products.json"

parse_arguments() {
    while [[ $# > 0 ]] ; do
        key="$1"

        case $key in
            --s3-file)
                S3_FILE_NAME="$2"
                shift
                shift
                ;;

            --local-file)
                LOCAL_FILE="$2"
                shift
                shift
                ;;

            --production)
                S3_PREFIX=S3_PREFIX=s3://alces-flight/FlightStore/products/
                shift
                ;;

            --staging)
                S3_PREFIX=S3_PREFIX=s3://alces-flight/FlightStore/staging-products/
                shift
                ;;

            --development)
                S3_PREFIX=S3_PREFIX=s3://alces-flight/FlightStore/development-products/
                shift
                ;;

            --help)
                usage
                exit 0
                ;;

            --*)
                echo "$(basename $0): unrecognized option ${key}"
                usage
                exit 1
                ;;
        esac
    done
}

main "$@"
