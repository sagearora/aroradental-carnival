'use server';

import { serviceAccountAuth } from "@/services/google-spreadsheet";
import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth)

export default async function checkIn(id: number, count: number) {
    try {
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const row = rows.find(r => r.rowNumber === id)
        if (row) {
            row.set('checked_in', count)
            await row.save()
        }
    } catch(error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}