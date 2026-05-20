# Updating the upstream version

Clams Remote is built from source via the `clams-remote/` git submodule. There is no `dockerTag` in the manifest, so the upstream pin is the submodule's checked-out commit.

## Determining the upstream version

- **Clams Remote** — [clams-tech/Remote](https://github.com/clams-tech/Remote). Latest release:
  ```bash
  gh release view -R clams-tech/Remote --json tagName -q .tagName
  ```
  Or by tag (fallback if no release is published for the newest tag):
  ```bash
  gh api repos/clams-tech/Remote/tags --jq '.[0].name'
  ```
  Pin lives in the `clams-remote` git submodule (see `.gitmodules`); current checkout shown by `git -C clams-remote describe --tags`.

## Applying the bump

- **Clams Remote** — update the submodule to the new tag:
  ```bash
  cd clams-remote && git fetch --tags && git checkout remote-<new version>
  cd .. && git add clams-remote
  ```
