import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionPlan } from '../../production-plans/entities/production-plan.entity';
import { WorkOrder } from '../../work-orders/entities/work-order.entity';

@Injectable()
export class ProductionStatusService {
  constructor(
    @InjectRepository(ProductionPlan)
    private productionPlanRepository: Repository<ProductionPlan>,
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
  ) {}

  // 전체 생산현황 조회
  async findAllStatus() {
    const plans = await this.productionPlanRepository.find({
      order: { createdAt: 'DESC' }
    });

    const statusList = await Promise.all(
      plans.map(async (plan) => {
        const workOrders = await this.workOrderRepository.find({
          where: { planId: plan.planId }
        });

        const totalOrderQuantity = workOrders.reduce((sum, order) => sum + order.orderQuantity, 0);
        const completedOrders = workOrders.filter(order => order.status === 'completed');
        const completedQuantity = completedOrders.reduce((sum, order) => sum + order.orderQuantity, 0);
        const inProgressOrders = workOrders.filter(order => order.status === 'in_progress');
        const inProgressQuantity = inProgressOrders.reduce((sum, order) => sum + order.orderQuantity, 0);

        const achievementRate = plan.planQuantity > 0 
          ? ((completedQuantity / plan.planQuantity) * 100).toFixed(2)
          : 0;

        return {
          planId: plan.planId,
          productCode: plan.productCode,
          productName: plan.productName,
          planQuantity: plan.planQuantity,
          totalOrderQuantity,
          completedQuantity,
          inProgressQuantity,
          remainingQuantity: plan.planQuantity - completedQuantity,
          achievementRate: parseFloat(achievementRate as string),
          workOrderCount: workOrders.length,
          completedOrderCount: completedOrders.length,
          inProgressOrderCount: inProgressOrders.length,
          status: plan.status,
          priority: plan.priority,
          workCenter: plan.workCenter,
          responsiblePerson: plan.responsiblePerson,
          plannedStartDate: plan.plannedStartDate,
          plannedEndDate: plan.plannedEndDate,
          actualStartDate: plan.actualStartDate,
          actualEndDate: plan.actualEndDate,
          estimatedHours: plan.estimatedHours,
          actualHours: plan.actualHours,
          workOrders: workOrders.map(order => ({
            orderId: order.orderId,
            orderQuantity: order.orderQuantity,
            status: order.status,
            priority: order.priority,
            workCenter: order.workCenter,
            supervisor: order.supervisor,
            operator: order.operator,
            startDate: order.startDate,
            endDate: order.endDate,
            estimatedHours: order.estimatedHours,
            actualHours: order.actualHours,
          })),
        };
      })
    );

    return statusList;
  }

  // 특정 생산계획의 현황 조회
  async findStatusByPlanId(planId: string) {
    const plan = await this.productionPlanRepository.findOne({
      where: { planId }
    });

    if (!plan) {
      throw new Error('해당 생산계획을 찾을 수 없습니다.');
    }

    const workOrders = await this.workOrderRepository.find({
      where: { planId }
    });

    const totalOrderQuantity = workOrders.reduce((sum, order) => sum + order.orderQuantity, 0);
    const completedOrders = workOrders.filter(order => order.status === 'completed');
    const completedQuantity = completedOrders.reduce((sum, order) => sum + order.orderQuantity, 0);
    const inProgressOrders = workOrders.filter(order => order.status === 'in_progress');
    const inProgressQuantity = inProgressOrders.reduce((sum, order) => sum + order.orderQuantity, 0);

    const achievementRate = plan.planQuantity > 0 
      ? ((completedQuantity / plan.planQuantity) * 100).toFixed(2)
      : 0;

    return {
      planId: plan.planId,
      productCode: plan.productCode,
      productName: plan.productName,
      planQuantity: plan.planQuantity,
      totalOrderQuantity,
      completedQuantity,
      inProgressQuantity,
      remainingQuantity: plan.planQuantity - completedQuantity,
      achievementRate: parseFloat(achievementRate as string),
      workOrderCount: workOrders.length,
      completedOrderCount: completedOrders.length,
      inProgressOrderCount: inProgressOrders.length,
      status: plan.status,
      priority: plan.priority,
      workCenter: plan.workCenter,
      responsiblePerson: plan.responsiblePerson,
      plannedStartDate: plan.plannedStartDate,
      plannedEndDate: plan.plannedEndDate,
      actualStartDate: plan.actualStartDate,
      actualEndDate: plan.actualEndDate,
      estimatedHours: plan.estimatedHours,
      actualHours: plan.actualHours,
      workOrders: workOrders.map(order => ({
        orderId: order.orderId,
        orderQuantity: order.orderQuantity,
        status: order.status,
        priority: order.priority,
        workCenter: order.workCenter,
        supervisor: order.supervisor,
        operator: order.operator,
        startDate: order.startDate,
        endDate: order.endDate,
        estimatedHours: order.estimatedHours,
        actualHours: order.actualHours,
      })),
    };
  }

  // 제품별 생산현황 조회
  async findStatusByProduct(productCode: string) {
    const plans = await this.productionPlanRepository.find({
      where: { productCode },
      order: { createdAt: 'DESC' }
    });

    const statusList = await Promise.all(
      plans.map(async (plan) => {
        const workOrders = await this.workOrderRepository.find({
          where: { planId: plan.planId }
        });

        const totalOrderQuantity = workOrders.reduce((sum, order) => sum + order.orderQuantity, 0);
        const completedQuantity = workOrders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + order.orderQuantity, 0);

        const achievementRate = plan.planQuantity > 0 
          ? ((completedQuantity / plan.planQuantity) * 100).toFixed(2)
          : 0;

        return {
          planId: plan.planId,
          planQuantity: plan.planQuantity,
          completedQuantity,
          achievementRate: parseFloat(achievementRate as string),
          status: plan.status,
          workOrderCount: workOrders.length,
        };
      })
    );

    const totalPlanQuantity = statusList.reduce((sum, item) => sum + item.planQuantity, 0);
    const totalCompletedQuantity = statusList.reduce((sum, item) => sum + item.completedQuantity, 0);
    const overallAchievementRate = totalPlanQuantity > 0
      ? ((totalCompletedQuantity / totalPlanQuantity) * 100).toFixed(2)
      : 0;

    return {
      productCode,
      totalPlanQuantity,
      totalCompletedQuantity,
      overallAchievementRate: parseFloat(overallAchievementRate as string),
      plans: statusList,
    };
  }

  // 작업장별 생산현황 조회
  async findStatusByWorkCenter(workCenter: string) {
    const plans = await this.productionPlanRepository.find({
      where: { workCenter },
      order: { createdAt: 'DESC' }
    });

    const statusList = await Promise.all(
      plans.map(async (plan) => {
        const workOrders = await this.workOrderRepository.find({
          where: { planId: plan.planId }
        });

        const completedQuantity = workOrders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + order.orderQuantity, 0);

        const achievementRate = plan.planQuantity > 0 
          ? ((completedQuantity / plan.planQuantity) * 100).toFixed(2)
          : 0;

        return {
          planId: plan.planId,
          productCode: plan.productCode,
          productName: plan.productName,
          planQuantity: plan.planQuantity,
          completedQuantity,
          achievementRate: parseFloat(achievementRate as string),
          status: plan.status,
        };
      })
    );

    return {
      workCenter,
      planCount: statusList.length,
      plans: statusList,
    };
  }

  // 기간별 생산현황 조회
  async findStatusByDateRange(startDate: string, endDate: string) {
    const plans = await this.productionPlanRepository
      .createQueryBuilder('plan')
      .where('plan.plannedStartDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('plan.plannedStartDate', 'ASC')
      .getMany();

    const statusList = await Promise.all(
      plans.map(async (plan) => {
        const workOrders = await this.workOrderRepository.find({
          where: { planId: plan.planId }
        });

        const completedQuantity = workOrders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + order.orderQuantity, 0);

        const achievementRate = plan.planQuantity > 0 
          ? ((completedQuantity / plan.planQuantity) * 100).toFixed(2)
          : 0;

        return {
          planId: plan.planId,
          productCode: plan.productCode,
          productName: plan.productName,
          planQuantity: plan.planQuantity,
          completedQuantity,
          achievementRate: parseFloat(achievementRate as string),
          status: plan.status,
          plannedStartDate: plan.plannedStartDate,
          plannedEndDate: plan.plannedEndDate,
        };
      })
    );

    const totalPlanQuantity = statusList.reduce((sum, item) => sum + item.planQuantity, 0);
    const totalCompletedQuantity = statusList.reduce((sum, item) => sum + item.completedQuantity, 0);
    const overallAchievementRate = totalPlanQuantity > 0
      ? ((totalCompletedQuantity / totalPlanQuantity) * 100).toFixed(2)
      : 0;

    return {
      startDate,
      endDate,
      totalPlanQuantity,
      totalCompletedQuantity,
      overallAchievementRate: parseFloat(overallAchievementRate as string),
      planCount: statusList.length,
      plans: statusList,
    };
  }

  // 진행중인 생산현황 조회
  async findInProgressStatus() {
    const plans = await this.productionPlanRepository.find({
      where: { status: 'in_progress' },
      order: { priority: 'DESC', plannedStartDate: 'ASC' }
    });

    const statusList = await Promise.all(
      plans.map(async (plan) => {
        const workOrders = await this.workOrderRepository.find({
          where: { planId: plan.planId }
        });

        const completedQuantity = workOrders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + order.orderQuantity, 0);
        const inProgressQuantity = workOrders
          .filter(order => order.status === 'in_progress')
          .reduce((sum, order) => sum + order.orderQuantity, 0);

        const achievementRate = plan.planQuantity > 0 
          ? ((completedQuantity / plan.planQuantity) * 100).toFixed(2)
          : 0;

        return {
          planId: plan.planId,
          productCode: plan.productCode,
          productName: plan.productName,
          planQuantity: plan.planQuantity,
          completedQuantity,
          inProgressQuantity,
          remainingQuantity: plan.planQuantity - completedQuantity,
          achievementRate: parseFloat(achievementRate as string),
          priority: plan.priority,
          workCenter: plan.workCenter,
          responsiblePerson: plan.responsiblePerson,
        };
      })
    );

    return statusList;
  }

  // 생산지시별 현황 조회
  async findStatusByWorkOrder(orderId: string) {
    const workOrder = await this.workOrderRepository.findOne({
      where: { orderId }
    });

    if (!workOrder) {
      throw new Error('해당 생산지시를 찾을 수 없습니다.');
    }

    let plan = null;
    if (workOrder.planId) {
      plan = await this.productionPlanRepository.findOne({
        where: { planId: workOrder.planId }
      });
    }

    return {
      workOrder: {
        orderId: workOrder.orderId,
        planId: workOrder.planId,
        productCode: workOrder.productCode,
        productName: workOrder.productName,
        orderQuantity: workOrder.orderQuantity,
        status: workOrder.status,
        priority: workOrder.priority,
        workCenter: workOrder.workCenter,
        supervisor: workOrder.supervisor,
        operator: workOrder.operator,
        startDate: workOrder.startDate,
        endDate: workOrder.endDate,
        estimatedHours: workOrder.estimatedHours,
        actualHours: workOrder.actualHours,
      },
      plan: plan ? {
        planId: plan.planId,
        planQuantity: plan.planQuantity,
        status: plan.status,
        plannedStartDate: plan.plannedStartDate,
        plannedEndDate: plan.plannedEndDate,
      } : null,
    };
  }
}
