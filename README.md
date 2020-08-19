# nsuploader
SuiteApp accepting a file to be uploaded

Save some time uploading files to Netsuite from your Emacs buffer (or any other IDE really) instead of running sdfcli for small changes ;)

Depends on:
- com.netsuite.nsuploader SuiteApp installed on your Netsuite account.
- Babashka (https://github.com/borkdude/babashka)

Usage:

Make sure the babashka script *ns-upload* is on your $PATH

```emacs
;; Add this function to your emacs config, bind it to a key and quickly upload the file on your buffer to Netsuite.
(defun upload-to-netsuite ()
  "Send buffer to Netsuite."
  (interactive)
  (let ((cmd (concat "ns-upload" " " (buffer-file-name))))
    (message (shell-command-to-string cmd))
    ))
```
