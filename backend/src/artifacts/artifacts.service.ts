import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artifact } from './artifact.entity';

@Injectable()
export class ArtifactsService {
  constructor(
    @InjectRepository(Artifact)
    private artifactsRepository: Repository<Artifact>,
  ) {}

  findAll(): Promise<Artifact[]> {
    return this.artifactsRepository.find();
  }

  findOne(id: number): Promise<Artifact | null> {
    return this.artifactsRepository.findOneBy({ id });
  }

  create(data: Partial<Artifact>): Promise<Artifact> {
    const artifact = this.artifactsRepository.create(data);
    return this.artifactsRepository.save(artifact);
  }

  async update(id: number, data: Partial<Artifact>): Promise<Artifact> {
    const artifact = await this.artifactsRepository.findOneBy({ id });
    if (!artifact) throw new NotFoundException('Artifact not found');

    Object.assign(artifact, data);
    return this.artifactsRepository.save(artifact);
  }

  async remove(id: number): Promise<void> {
    const result = await this.artifactsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Artifact not found');
    }
  }
}
