'use server';

import { serviceAccountAuth } from '@/services/google-spreadsheet';
import parseRsvp from "@/utils/parse-rsvp";
import Fuse from 'fuse.js';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth)


export default async function searchRSVP(query: string) {
    try {
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const items = rows.map(row => {
            return parseRsvp(row.rowNumber, row)
        })
        const fuse = new Fuse(items, {
            includeScore: true,
            keys: ['name'],
            threshold: 0.2,
        })

        return fuse.search(query)
    } catch(error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}