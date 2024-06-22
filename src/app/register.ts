'use server';

import { serviceAccountAuth } from "@/services/google-spreadsheet";
import { RsvpItemType } from "@/types/RsvpItemType";
import parseRsvp from "@/utils/parse-rsvp";
import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', serviceAccountAuth)
export default async function register(row_data: RsvpItemType) {
    try {
        await doc.loadInfo()
        const sheet = doc.sheetsByIndex[0];
        const new_row = await sheet.addRow(row_data)
        return parseRsvp(new_row.rowNumber, new_row)
    } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
    }
}