#!/bin/bash

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
VERSION_FILE="${REPO_ROOT}/flight-store-lib/package.json"
PACKAGE_NAME=$(cat "${REPO_ROOT}/flight-store-lib/package.json" | jq -r .name )
BUCKET_PREFIX="alces-flight/FlightStore"

main() {
    parse_arguments
    header "Checking repo is clean"
    abort_if_uncommitted_changes_present
    abort_if_not_uptodate_with_remotes
    header "Checking version"
    abort_if_new_version_exists
    subheader "Creating release branch"
    checkout_release_branch
    header "Bumping version"
    bump_version
    commit_version_bump
    header "Building"
    build_and_pack
    header "Releasing to s3"
    release_to_s3
    header "Merging, tagging, and pushing"
    run_merge_script
}

abort_if_uncommitted_changes_present() {
    if ! git diff-index --quiet HEAD ; then
        echo "$0: Uncommitted changes present aborting. Either stash or commit."
        exit 2
    fi
}

abort_if_not_uptodate_with_remotes() {
    git fetch origin
    abort_if_not_uptodate_with_remote master
}

abort_if_not_uptodate_with_remote() {
    local branch local_rev remote_rev base_rev
    branch=${1:-HEAD}

    local_rev=$(git rev-parse ${branch})
    if [ "${branch}" == "HEAD" ] ; then
        remote_rev=$(git rev-parse @{upstream})
    else
        remote_rev=$(git rev-parse origin/${branch})
    fi
    if [ "${branch}" == "HEAD" ] ; then
        base_rev=$(git merge-base ${branch} @{upstream})
    else
        base_rev=$(git merge-base ${branch} origin/${branch})
    fi

    if [ $local_rev = $remote_rev ]; then
        # Everything is good.
        return 0
    elif [ $local_rev = $base_rev ]; then
        echo "Local branch (${branch}) not up-to-date.  You need to pull in the remote changes."
        exit 3
    elif [ $remote_rev = $base_rev ]; then
        echo "Local branch (${branch}) has unpushed changes.  Oops!"
        exit 4
    else
        echo "Local and remote branches have diverged.  Oh dear!!"
        exit 5
    fi
}

abort_if_new_version_exists() {
    local new_version
    new_version=$(get_new_version)
    if aws s3 ls s3://${BUCKET_PREFIX}/${new_version} ; then
        echo "Version ${new_version} already exits on AWS"
        exit 6
    fi
}

get_current_version() {
    cat package.json \
        | jq -r .version
}

get_new_version() {
    get_current_version \
      | awk 'BEGIN { FS="." } { print $1 "." $2 "." $3 + 1 }'
}

checkout_release_branch() {
    git checkout -b release/"$(get_new_version)"
}

bump_version() {
    yarn version --new-version $(get_new_version) --no-git-tag-version
}

commit_version_bump() {
    git commit -m "Bump version to $(get_current_version)" "${VERSION_FILE}"
}

build_and_pack() {
    yarn run clean
    yarn run build
    yarn pack
}

release_to_s3() {
    aws s3 cp --acl public-read \
        ${PACKAGE_NAME}-v$(get_current_version).tgz \
        s3://${BUCKET_PREFIX}/$(get_current_version)/${PACKAGE_NAME}.tgz
}

run_merge_script() {
    "${REPO_ROOT}"/bin/merge-and-tag-release.sh "$(get_current_version)"

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
    echo "Build, tag and release a new version of ${PACKAGE_NAME}"
    echo
    echo -e "      --help\t\tShow this help message"
}

REMOTE=dokku-staging

parse_arguments() {
    while [[ $# > 0 ]] ; do
        key="$1"

        case $key in
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

main "$@"

