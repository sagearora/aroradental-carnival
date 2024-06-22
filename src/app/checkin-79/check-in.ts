'use server';

import { doc } from '@/services/google-spreadsheet';

export default async function checkIn(id: number, count: number) {
    try {
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const row = rows.find(r => r.rowNumber === id)
        if (row) {
            row.set('checked in', count)
            await row.save()
        }
    } catch(error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}