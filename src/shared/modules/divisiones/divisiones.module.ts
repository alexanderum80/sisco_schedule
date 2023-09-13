import { DivisionesEntity } from './divisiones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([DivisionesEntity])],
})
export class DivisionesModule {}
