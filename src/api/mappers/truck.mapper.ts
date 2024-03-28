import { TruckCalendars } from "@api/models/TruckCalendars";
import { TruckDayResponseDTO, TruckDayResponse } from "@api/responses/Trucks/truck.interface";
import { Day } from "../models/Day";
function getDayOfWeek(input: Day):TruckDayResponse{
    if (input.customDay) {
        return {
            dayOfWeek: input.customDay.getDay(),
            nameOfDay: input.name
        }
    } else if (input.holiday) {
        return {
            dayOfWeek: input.holiday.getDay(),
            nameOfDay: input.name
        }
    } else {
        return {
            dayOfWeek: input.dayOfWeek,
            nameOfDay: input.name
        }
    }
}
export function mapTruckCalendarToTruckDay(input: TruckCalendars): TruckDayResponseDTO {
    const response: TruckDayResponseDTO = {
        siteCode: input.site?.code || "",
        siteName: input.site?.name || "",
        truckCode: input.truck?.code || "",
        truckName: input.truck?.name || "",
        startAt: input.start_at,
        endAt: input.end_at,
        ...getDayOfWeek(input.day)
    }

    return response;

}