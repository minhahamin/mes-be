import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from '../entities/claim.entity';
import { CreateClaimDto } from '../dto/create-claim.dto';
import { UpdateClaimDto } from '../dto/update-claim.dto';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) {}

  async create(createClaimDto: CreateClaimDto): Promise<Claim> {
    // 자동증가 클레임 ID 생성
    const totalCount = await this.claimRepository.count();
    const nextClaimId = `CLM2024${String(totalCount + 1).padStart(3, '0')}`;

    const claim = this.claimRepository.create({
      ...createClaimDto,
      claimId: nextClaimId,
    });

    return await this.claimRepository.save(claim);
  }

  async findAll(): Promise<Claim[]> {
    return await this.claimRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Claim> {
    const claim = await this.claimRepository.findOne({
      where: { id }
    });

    if (!claim) {
      throw new NotFoundException('해당 클레임을 찾을 수 없습니다.');
    }

    return claim;
  }

  async update(id: number, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    const claim = await this.findOne(id);

    Object.assign(claim, updateClaimDto);

    return await this.claimRepository.save(claim);
  }

  async remove(id: number): Promise<void> {
    const claim = await this.findOne(id);
    await this.claimRepository.remove(claim);
  }

  // 상태별 클레임 조회
  async findByStatus(status: string): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 고객별 클레임 조회
  async findByCustomer(customerName: string): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { customerName },
      order: { createdAt: 'DESC' }
    });
  }

  // 제품별 클레임 조회
  async findByProduct(productCode: string): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { productCode },
      order: { createdAt: 'DESC' }
    });
  }

  // 클레임 유형별 조회
  async findByClaimType(claimType: string): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { claimType },
      order: { createdAt: 'DESC' }
    });
  }

  // 담당자별 클레임 조회
  async findByAssignedTo(assignedTo: string): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { assignedTo },
      order: { createdAt: 'DESC' }
    });
  }

  // 우선순위별 클레임 조회
  async findByPriority(priority: string): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { priority },
      order: { claimDate: 'ASC' }
    });
  }

  // 보상 유형별 클레임 조회
  async findByCompensationType(compensationType: string): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { compensationType },
      order: { createdAt: 'DESC' }
    });
  }

  // 기간별 클레임 조회
  async findByDateRange(startDate: string, endDate: string): Promise<Claim[]> {
    return await this.claimRepository
      .createQueryBuilder('claim')
      .where('claim.claimDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('claim.claimDate', 'ASC')
      .getMany();
  }

  // 대기중인 클레임 조회
  async findPending(): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { status: 'pending' },
      order: { priority: 'DESC', claimDate: 'ASC' }
    });
  }

  // 처리중인 클레임 조회
  async findInProgress(): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { status: 'investigating' },
      order: { priority: 'DESC', claimDate: 'ASC' }
    });
  }

  // 해결된 클레임 조회
  async findResolved(): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { status: 'resolved' },
      order: { resolutionDate: 'DESC' }
    });
  }

  // 긴급 클레임 조회
  async findUrgent(): Promise<Claim[]> {
    return await this.claimRepository.find({
      where: { priority: 'urgent' },
      order: { claimDate: 'ASC' }
    });
  }

  // 클레임 상태 업데이트
  async updateStatus(id: number, status: string): Promise<Claim> {
    const claim = await this.findOne(id);
    claim.status = status;
    
    // 상태가 resolved로 변경되고 해결일이 없으면 현재 날짜로 설정
    if (status === 'resolved' && !claim.resolutionDate) {
      claim.resolutionDate = new Date();
    }
    
    return await this.claimRepository.save(claim);
  }

  // 클레임 해결 처리
  async resolveClaim(id: number, resolutionDescription: string, compensationAmount?: number, compensationType?: string): Promise<Claim> {
    const claim = await this.findOne(id);
    claim.status = 'resolved';
    claim.resolutionDate = new Date();
    claim.resolutionDescription = resolutionDescription;
    
    if (compensationAmount !== undefined) {
      claim.compensationAmount = compensationAmount;
    }
    if (compensationType) {
      claim.compensationType = compensationType;
    }
    
    return await this.claimRepository.save(claim);
  }

  // 담당자 배정
  async assignClaim(id: number, assignedTo: string): Promise<Claim> {
    const claim = await this.findOne(id);
    claim.assignedTo = assignedTo;
    
    // 대기중이면 조사중으로 변경
    if (claim.status === 'pending') {
      claim.status = 'investigating';
    }
    
    return await this.claimRepository.save(claim);
  }

  // 우선순위 변경
  async changePriority(id: number, priority: string): Promise<Claim> {
    const claim = await this.findOne(id);
    claim.priority = priority;
    return await this.claimRepository.save(claim);
  }

  // 클레임 통계 조회 (제품별)
  async getClaimStatsByProduct(productCode: string) {
    const claims = await this.findByProduct(productCode);

    const totalClaims = claims.length;
    const pendingClaims = claims.filter(c => c.status === 'pending').length;
    const inProgressClaims = claims.filter(c => c.status === 'investigating').length;
    const resolvedClaims = claims.filter(c => c.status === 'resolved').length;
    const rejectedClaims = claims.filter(c => c.status === 'rejected').length;

    const totalCompensation = claims.reduce((sum, c) => sum + parseFloat(c.compensationAmount.toString()), 0);

    // 클레임 유형별 통계
    const claimTypes = {};
    claims.forEach(claim => {
      if (!claimTypes[claim.claimType]) {
        claimTypes[claim.claimType] = 0;
      }
      claimTypes[claim.claimType]++;
    });

    return {
      productCode,
      totalClaims,
      pendingClaims,
      inProgressClaims,
      resolvedClaims,
      rejectedClaims,
      totalCompensation,
      claimTypes,
    };
  }

  // 클레임 통계 조회 (기간별)
  async getClaimStatsByDateRange(startDate: string, endDate: string) {
    const claims = await this.findByDateRange(startDate, endDate);

    const totalClaims = claims.length;
    const pendingClaims = claims.filter(c => c.status === 'pending').length;
    const inProgressClaims = claims.filter(c => c.status === 'investigating').length;
    const resolvedClaims = claims.filter(c => c.status === 'resolved').length;
    const rejectedClaims = claims.filter(c => c.status === 'rejected').length;

    const totalCompensation = claims.reduce((sum, c) => sum + parseFloat(c.compensationAmount.toString()), 0);

    // 클레임 유형별 통계
    const claimTypes = {};
    claims.forEach(claim => {
      if (!claimTypes[claim.claimType]) {
        claimTypes[claim.claimType] = 0;
      }
      claimTypes[claim.claimType]++;
    });

    // 보상 유형별 통계
    const compensationTypes = {};
    claims.forEach(claim => {
      if (claim.compensationType) {
        if (!compensationTypes[claim.compensationType]) {
          compensationTypes[claim.compensationType] = 0;
        }
        compensationTypes[claim.compensationType]++;
      }
    });

    return {
      startDate,
      endDate,
      totalClaims,
      pendingClaims,
      inProgressClaims,
      resolvedClaims,
      rejectedClaims,
      totalCompensation,
      claimTypes,
      compensationTypes,
    };
  }
}
