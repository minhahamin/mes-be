import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityInspection } from '../entities/quality-inspection.entity';
import { CreateQualityInspectionDto } from '../dto/create-quality-inspection.dto';
import { UpdateQualityInspectionDto } from '../dto/update-quality-inspection.dto';

@Injectable()
export class QualityInspectionsService {
  constructor(
    @InjectRepository(QualityInspection)
    private qualityInspectionRepository: Repository<QualityInspection>,
  ) {}

  async create(createQualityInspectionDto: CreateQualityInspectionDto): Promise<QualityInspection> {
    // 자동증가 품질검사 ID 생성
    const totalCount = await this.qualityInspectionRepository.count();
    const nextQualityId = `Q2024${String(totalCount + 1).padStart(3, '0')}`;

    // 배치번호 자동 생성 (제공되지 않은 경우)
    let batchNumber = createQualityInspectionDto.batchNumber;
    if (!batchNumber) {
      batchNumber = `BATCH${String(totalCount + 1).padStart(3, '0')}`;
    }

    // 합격률 계산 (제공되지 않은 경우)
    let passRate = createQualityInspectionDto.passRate;
    if (passRate === undefined && createQualityInspectionDto.quantityInspected > 0) {
      passRate = (createQualityInspectionDto.quantityPassed / createQualityInspectionDto.quantityInspected) * 100;
    }

    const qualityInspection = this.qualityInspectionRepository.create({
      ...createQualityInspectionDto,
      qualityId: nextQualityId,
      batchNumber,
      passRate: passRate || 0,
    });

    return await this.qualityInspectionRepository.save(qualityInspection);
  }

  async findAll(): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<QualityInspection> {
    const qualityInspection = await this.qualityInspectionRepository.findOne({
      where: { id }
    });

    if (!qualityInspection) {
      throw new NotFoundException('해당 품질검사를 찾을 수 없습니다.');
    }

    return qualityInspection;
  }

  async update(id: number, updateQualityInspectionDto: UpdateQualityInspectionDto): Promise<QualityInspection> {
    const qualityInspection = await this.findOne(id);

    // 합격률 재계산 (수량이 변경된 경우)
    if (updateQualityInspectionDto.quantityInspected || updateQualityInspectionDto.quantityPassed) {
      const quantityInspected = updateQualityInspectionDto.quantityInspected || qualityInspection.quantityInspected;
      const quantityPassed = updateQualityInspectionDto.quantityPassed || qualityInspection.quantityPassed;
      
      if (quantityInspected > 0) {
        updateQualityInspectionDto.passRate = (quantityPassed / quantityInspected) * 100;
      }
    }

    Object.assign(qualityInspection, updateQualityInspectionDto);

    return await this.qualityInspectionRepository.save(qualityInspection);
  }

  async remove(id: number): Promise<void> {
    const qualityInspection = await this.findOne(id);
    await this.qualityInspectionRepository.remove(qualityInspection);
  }

  // 상태별 품질검사 조회
  async findByStatus(status: string): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 제품별 품질검사 조회
  async findByProduct(productCode: string): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { productCode },
      order: { createdAt: 'DESC' }
    });
  }

  // 검사 유형별 조회
  async findByInspectionType(inspectionType: string): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { inspectionType },
      order: { createdAt: 'DESC' }
    });
  }

  // 검사자별 조회
  async findByInspector(inspector: string): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { inspector },
      order: { createdAt: 'DESC' }
    });
  }

  // 배치 번호별 조회
  async findByBatchNumber(batchNumber: string): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { batchNumber },
      order: { createdAt: 'DESC' }
    });
  }

  // 불량 유형별 조회
  async findByDefectType(defectType: string): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { defectType },
      order: { createdAt: 'DESC' }
    });
  }

  // 기간별 품질검사 조회
  async findByDateRange(startDate: string, endDate: string): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository
      .createQueryBuilder('inspection')
      .where('inspection.inspectionDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('inspection.inspectionDate', 'ASC')
      .getMany();
  }

  // 합격 검사 조회
  async findPassed(): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { status: 'pass' },
      order: { createdAt: 'DESC' }
    });
  }

  // 불합격 검사 조회
  async findFailed(): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { status: 'fail' },
      order: { createdAt: 'DESC' }
    });
  }

  // 대기중인 검사 조회
  async findPending(): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository.find({
      where: { status: 'pending' },
      order: { inspectionDate: 'ASC' }
    });
  }

  // 합격률 기준 조회 (특정 합격률 미만)
  async findByPassRateBelow(passRate: number): Promise<QualityInspection[]> {
    return await this.qualityInspectionRepository
      .createQueryBuilder('inspection')
      .where('inspection.passRate < :passRate', { passRate })
      .orderBy('inspection.passRate', 'ASC')
      .getMany();
  }

  // 품질 통계 조회 (제품별)
  async getQualityStatsByProduct(productCode: string) {
    const inspections = await this.findByProduct(productCode);

    const totalInspections = inspections.length;
    const passedInspections = inspections.filter(i => i.status === 'pass').length;
    const failedInspections = inspections.filter(i => i.status === 'fail').length;
    
    const totalQuantityInspected = inspections.reduce((sum, i) => sum + i.quantityInspected, 0);
    const totalQuantityPassed = inspections.reduce((sum, i) => sum + i.quantityPassed, 0);
    const totalQuantityFailed = inspections.reduce((sum, i) => sum + i.quantityFailed, 0);
    
    const overallPassRate = totalQuantityInspected > 0
      ? ((totalQuantityPassed / totalQuantityInspected) * 100).toFixed(2)
      : 0;

    return {
      productCode,
      totalInspections,
      passedInspections,
      failedInspections,
      totalQuantityInspected,
      totalQuantityPassed,
      totalQuantityFailed,
      overallPassRate: parseFloat(overallPassRate as string),
      inspections,
    };
  }

  // 품질 통계 조회 (기간별)
  async getQualityStatsByDateRange(startDate: string, endDate: string) {
    const inspections = await this.findByDateRange(startDate, endDate);

    const totalInspections = inspections.length;
    const passedInspections = inspections.filter(i => i.status === 'pass').length;
    const failedInspections = inspections.filter(i => i.status === 'fail').length;
    
    const totalQuantityInspected = inspections.reduce((sum, i) => sum + i.quantityInspected, 0);
    const totalQuantityPassed = inspections.reduce((sum, i) => sum + i.quantityPassed, 0);
    const totalQuantityFailed = inspections.reduce((sum, i) => sum + i.quantityFailed, 0);
    
    const overallPassRate = totalQuantityInspected > 0
      ? ((totalQuantityPassed / totalQuantityInspected) * 100).toFixed(2)
      : 0;

    // 불량 유형 통계
    const defectTypes = {};
    inspections.forEach(inspection => {
      if (inspection.defectType) {
        if (!defectTypes[inspection.defectType]) {
          defectTypes[inspection.defectType] = 0;
        }
        defectTypes[inspection.defectType] += inspection.quantityFailed;
      }
    });

    return {
      startDate,
      endDate,
      totalInspections,
      passedInspections,
      failedInspections,
      totalQuantityInspected,
      totalQuantityPassed,
      totalQuantityFailed,
      overallPassRate: parseFloat(overallPassRate as string),
      defectTypes,
    };
  }
}
