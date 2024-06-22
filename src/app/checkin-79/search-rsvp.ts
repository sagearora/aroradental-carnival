'use server';

import { RsvpItemType } from '@/app/checkin-79/RsvpItem';
import { doc } from '@/services/google-spreadsheet';
import config from '@/utils/sheet-config';
import Fuse from 'fuse.js'

export default async function searchRSVP(query: string) {
    try {
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const items = rows.map(row => {
            return config.reduce((obj, item) => ({
                ...obj,
                [item.id]: item.parse ? item.parse(row.get(item.name)) : row.get(item.name),
            }), {
                id: row.rowNumber,
            } as RsvpItemType)
        })
        const fuse = new Fuse(items, {
            includeScore: true,
            keys: ['full_name'],
            threshold: 0.2,
        })

        return fuse.search(query)
    } catch(error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}