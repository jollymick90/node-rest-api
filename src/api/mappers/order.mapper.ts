import { Dish } from '@api/models/Dish';
import {
  CategoryDTO,
  TagDTO,
} from '@api/responses/LookUp/lookup.interface';
import {
  DishDTO,
  OrderDto,
  OrderItemDTO,
  TruckOrderDto,
} from '@api/responses/Orders/order.interface';

import {
  Order,
  OrdersItems,
} from '../models';
import { Category } from '../models/Category';
import { Tag } from '../models/Tag';
import { mapLookUpDTO } from './lookup.mapper';

export function mapDishToDTO(input: Dish): DishDTO {
    const response: DishDTO = {
        id: input.id,
        code: input.code,
        name: input.name,
        description: input.description,
        note: input.note,
        categories: mapCategories(input.categories),
        tags: mapTags(input.tags)
    }

    return response;

}

function mapCategories(categories: Category[]): CategoryDTO[] | undefined {
    if (!categories) return;

    return categories.map(mapCategoryDTO);
}

function mapTags(tags: Tag[]): TagDTO[] | undefined {
    if (!tags) return;

    return tags.map(mapTagDTO);
}

const mapCategoryDTO = (cateogry: Category): CategoryDTO => ({ ...mapLookUpDTO(cateogry) })
const mapTagDTO = (tag: Tag): TagDTO => ({ ...mapLookUpDTO(tag) })

export function mapOrderResponse(order: Order): OrderDto {
    return {
        id: order.id,
        ordersItems: order.ordersItems?.map(mapOrderItemsDto) || [],
        stateOrderCode: order.stateOrder?.code || "",    
        truckCode: order.truck?.code || ""
    }
}

export function mapTruckOrderResponse(order: Order): TruckOrderDto {
    return {
        id: order.id,
        ordersItems: [],
        stateOrderCode: order.stateOrder?.code || "",    
        truckCode: order?.truck?.code,
        userName: order?.user?.name,
        userUuid: order?.user?.uuid
    }
}

function mapOrderItemsDto(orderItem: OrdersItems): OrderItemDTO {
    return {
        dish: orderItem.dish        
    }
}