import * as Express from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ArtifactsService } from './artifacts.service';
import { Artifact } from './artifact.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('artifacts')
export class ArtifactsController {
  constructor(private readonly artifactsService: ArtifactsService) {}

  @Get()
  findAll(): Promise<Artifact[]> {
    return this.artifactsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artifact> {
    const artifact = await this.artifactsService.findOne(+id);
    if (!artifact) throw new NotFoundException('Artifact not found');
    return artifact;
  }

  @Post()
  create(@Body() artifactData: Partial<Artifact>): Promise<Artifact> {
    return this.artifactsService.create(artifactData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() artifactData: Partial<Artifact>,
  ): Promise<Artifact> {
    return this.artifactsService.update(+id, artifactData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.artifactsService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `artifact-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: any, @Req() req: Request) {
    const host = req.get('host');
    const protocol = req.protocol;
    return {
      imageUrl: `${protocol}://${host}/uploads/${file.filename}`,
    };
  }
}
