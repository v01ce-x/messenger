import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export class UploadAvatarPipe extends ParseFilePipe {
  constructor() {
    super({
      validators: [
        new MaxFileSizeValidator({
          errorMessage: 'Длина файла не может привышать 5 Мб',
          maxSize: 1024 * 1024 * 5,
        }),
        new FileTypeValidator({
          errorMessage: 'Доступны только такие форматы (jpeg, jpg, png, svg)',
          fileType: /\/(jpeg|jpg|png|gif|svg)$/,
        }),
      ],

      fileIsRequired: true,
    });
  }
}
