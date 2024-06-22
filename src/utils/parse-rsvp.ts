import { RsvpItemType } from "@/types/RsvpItemType"
import config from "@/utils/sheet-config"

const baseFn = (val: string) => val

const parseRsvp = (rowNumber: number, row: any) => {
    return Object.keys(config).reduce((obj, item) => ({
        ...obj,
        [item]: (config[item].parse || baseFn)(row.get(item)),
    }), {
        id: rowNumber,
    } as RsvpItemType)
}

export default parseRsvp