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

Note: This side project is now discontinued.

For single file upload, use *sdfcli uploadfiles*

I am writing a "netsuite mode" wrapping sdfcli commands so that it can be used from Emacs, it is in very early stages (as I ramp-up elisp knowledge) but if you are looking for something try this:

```emacs
(defun netsuite/list-authids ()
  "Use sdfcli to list registered authids."
  (let* ((sdfcli-command "sdfcli manageauth -list")
         (sdfcli-result  (shell-command-to-string sdfcli-command))
         (sdfcli-options (cdr (split-string sdfcli-result "\n"))))
    (-non-nil (mapcar (lambda (v) (car (split-string v))) sdfcli-options))))
        
(defun netsuite/upload-buffer ()
  "Use sdfcli uploadfiles to upload the current buffer to a netsuite account."

  (interactive)
  (let ((project-path (car (split-string (buffer-file-name) "FileCabinet")))
        (file-path (car (cdr (split-string (buffer-file-name) "FileCabinet"))))
        (sdf-authid (ido-completing-read "SDF Auth id:" (netsuite/list-authids))))
    (async-shell-command (concat "sdfcli uploadfiles -paths " file-path  " -authid " sdf-authid " -p " project-path))))
```
