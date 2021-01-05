{{ JS_COPYRIGHT_NOTICE }}
import FileUploader from '{{ SITE_PATH }}/js/FileUploader.js';
import DialogSelector from '{{ SITE_PATH }}/js/DialogSelector.js';

DialogSelector.initialize(FileUploader.uploadFile);
