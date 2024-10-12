#!/bin/bash
set -euo pipefail

scriptDir=$(dirname -- "$(readlink -f -- "${BASH_SOURCE[0]}")")

cd "${scriptDir}/backend" || exit 1
npm install --silent
npm run test
