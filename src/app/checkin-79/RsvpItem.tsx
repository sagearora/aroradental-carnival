import { Button } from "@/components/ui/button"
import { RsvpItemType } from "@/types/RsvpItemType"
import { useDebounce } from "@uidotdev/usehooks"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export default function RsvpItem({
    item,
    checkIn,
}: {
    item: RsvpItemType
    checkIn: (id: number, count: number) => void
}) {
    const [count, setCount] = useState<number>(item.checked_in || 0)
    const debouncedCount = useDebounce(count, 1000)

    useEffect(() => {
        if (debouncedCount === (item.checked_in || 0)) {
            return;
        }
        console.log('update')
        checkIn(item.id, debouncedCount)
    }, [debouncedCount, item.id, item.checked_in])

    return <div key={item.id} className='py-4 border-b flex items-center space-x-4'>
        <div className="flex flex-col items-stretch self-start w-16 justify-center space-y-1">
            <Button size='lg'
                onClick={() => setCount(c => c + 1)} className="text-2xl w-full">+{count || ''}</Button>
            {count > 0 && <Button
                onClick={() => setCount(c => c - 1)}
                variant='outline' className="text-2xl w-full border-destructive text-destructive">-1</Button>}
        </div>
        <div className="flex-1">
            <div className="text-2xl font-bold">{item.name} - {item.current_patient}</div>
            <div>{item.email}</div>
            <div className="text-lg">[{item.total_guests}] {item.guest_names}</div>
        </div>
        <div className="text-3xl font-bold">{dayjs(`2024-01-01 ${item.time_slot}`).format('hA')}</div>
    </div>
}