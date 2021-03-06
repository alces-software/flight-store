#!/bin/bash

set -euo pipefail

main() {
    parse_arguments "$@"
    abort_if_monorepo_part_not_set
    set_remote
    header "Checking repo is clean"
    abort_if_uncommitted_changes_present
    header "Deploying ${COMMIT_ISH} to ${REMOTE}"
    deploy
}

abort_if_monorepo_part_not_set() {
    if [ -z "$MONOREPO_PART" ]; then
        echo "$0: mandatory option --monorepo-part not provided"
        exit 3
    fi
}

set_remote() {
    REMOTE="${MONOREPO_PART}${REMOTE_SUFFIX}"
}

abort_if_uncommitted_changes_present() {
    if ! git diff-index --quiet HEAD ; then
        echo "$0: Uncommitted changes present aborting. Either stash or commit."
        exit 2
    fi
}

deploy() {
    git push ${REMOTE} -f "${COMMIT_ISH}":refs/heads/master 2> >(indent 1>&2) | indent
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
    echo "Usage: $(basename $0) [options] [<commit-ish>]"
    echo
    echo "Deploy <commit-ish> to a dokku app"
    echo
    echo -e "      If <commit-sh> is not given use HEAD"
    echo
    echo -e "      --production\t\t\tDeploy to the production environment"
    echo -e "      --monorepo-part [client|server]\tWhich app to deploy from this monorepo"
    echo -e "      --help\t\t\t\tShow this help message"
}

REMOTE=
COMMIT_ISH=HEAD
MONOREPO_PART=
REMOTE_SUFFIX=-staging

parse_arguments() {
    while [[ $# > 0 ]] ; do
        key="$1"

        case $key in
            --production)
                REMOTE_SUFFIX=
                shift
                ;;

            --test)
                REMOTE_SUFFIX=-test
                shift
                ;;

            --monorepo-part)
                MONOREPO_PART="$2"
                shift
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

            *)
                COMMIT_ISH="${key}"
                shift
                ;;
        esac
    done
}

main "$@"
