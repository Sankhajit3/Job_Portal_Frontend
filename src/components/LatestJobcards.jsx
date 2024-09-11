import { Badge } from './ui/badge'

const LatestJobcards = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
        <h1 className='font-medium text-lg'>TCS </h1>
        <p className='text-sm text-gray-500'>Kolkata</p>
        </div>
        <div>
            <h1 className='font-bold text-lg y-2'>job Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
          <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Position</Badge>
          <Badge className={'text-[#F83002] font-bold'} variant="ghost">Part Time</Badge>
          <Badge className={'text-[#7209B7] font-bold'} variant="ghost">24 LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobcards