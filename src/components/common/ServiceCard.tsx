// import { useRouter } from 'next/router';
// import Image from 'next/image';

// interface ServiceCardProps {
//   id: string;
//   title: string;
//   thumbnail: string;
//   subtitle: string;
//   desc: string;
//   credits: number;
//   endpoint: string;
//   fieldname?: string;
// }

// const ServiceCard: React.FC<ServiceCardProps> = ({
//   id,
//   title,
//   thumbnail,
//   subtitle,
//   desc,
//   credits,
//   endpoint,
//   fieldname,
// }) => {
//   const router = useRouter();

//   const handleScan = () => {
//     router.push({
//       pathname: `/scan/${id}/`,
//       query: { endpoint, fieldname, title },
//     }, undefined, { shallow: true });
//   };

//   return (
//     <div className="bg-white rounded-lg p-4 shadow-md">
//       <div className="relative h-48 w-full">
//         <Image src={thumbnail} alt={title} layout="fill" objectFit="cover" className="rounded-lg" />
//       </div>

//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">{title}</h3>
//         <p className="text-gray-600">{subtitle}</p>

//         <div className="flex justify-between items-center mt-4">
//           <span className="text-indigo-600">{credits} Credits</span>
//           <button
//             onClick={handleScan}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-md"
//           >
//             Scan Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;
// ServiceCard.tsx
import { useRouter } from 'next/router';
import Image from 'next/image';

interface ServiceCardProps {
  id: string;
  title: string;
  thumbnail: string;
  subtitle: string;
  desc: string;
  credits: number;
  endpoint: string;
  fieldname?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  thumbnail,
  subtitle,
  credits,
  endpoint,
  fieldname,
}) => {
  const router = useRouter();

  const handleScan = () => {
    // Base64 encode the parameters to make them less readable
    const params = btoa(JSON.stringify({
      endpoint,
      fieldname,
      title
    }));
    
    // Navigate to the scan page with a clean URL
    // Hash fragments (#) are not sent to the server and won't appear in server logs
    router.push({
      pathname: `/scan/${id}/`,
      hash: params
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={thumbnail}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600">
            {credits === 0 ? "Free" : `${credits} Credits`}
          </span>
          <button
            onClick={handleScan}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Scan Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;