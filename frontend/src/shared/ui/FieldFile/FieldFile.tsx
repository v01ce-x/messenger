import React, { useRef, useState } from 'react';
import { DownloadIcon } from '@/shared/ui';
import './FieldFile.scss';

interface FieldFileProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMb?: number;
  className?: string;
  label?: string;
}

const FieldFile = ({
  onFileSelect,
  accept,
  maxSizeMb = 5,
  className,
  label,
}: FieldFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessFile = (file: File | undefined) => {
    if (!file) return;

    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Файл слишком большой. Максимум: ${maxSizeMb} МБ`);
      return;
    }

    setError(null);
    onFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleProcessFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleProcessFile(file);
  };

  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };

  let dropzoneClasses = 'field-file__dropzone';
  if (isDragActive) dropzoneClasses += ' field-file__dropzone--active';
  if (error) dropzoneClasses += ' field-file__dropzone--error';

  const blockClasses = `field-file ${className || ''}`.trim();

  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <div className={blockClasses}>
        <div
          className={dropzoneClasses}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleZoneClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="field-file__native-input"
            accept={accept}
            onChange={handleInputChange}
          />

          <div className="field-file__content">
            <DownloadIcon className="field-file__icon" />
            <p className="field-file__text">
              <span className="field-file__link-text">
                Нажмите для загрузки
              </span>{' '}
              или перетащите файл сюда
            </p>
            <span className="field-file__hint">
              {accept
                ? `Форматы: ${accept.replace(/\./g, ' ')}`
                : 'Любые файлы'}{' '}
              (до {maxSizeMb}МБ)
            </span>
          </div>
        </div>

        {error && <span className="field-file__error-message">{error}</span>}
      </div>
    </div>
  );
};

export default FieldFile;
