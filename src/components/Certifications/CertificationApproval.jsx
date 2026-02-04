// import { useEffect, useState } from "react";
// import { Table, Tabs, SimpleGrid, For } from "@chakra-ui/react";
// import CertificationBriefCard from "./CertificationBriefCard";

// function CertificationApprovalComponent() {
//   const [items, setItems] = useState([]);
//   const [isCardActive, setIsCardActive] = useState(false);
//   const [cardItem, setCardItem] = useState(null);

//   useEffect(() => {
//     setItems([
//       { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
//       {
//         id: 2,
//         name: "Coffee Maker",
//         category: "Home Appliances",
//         price: 49.99,
//       },
//       { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
//       { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
//       { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
//     ]);
//   }, []);

//   function openApprovalCard(item) {
//     console.log(item);
//     setIsCardActive(true);
//   }

//   return (
//     <>
//       {isCardActive && (
//         <>
//           <CertificationBriefCard item={cardItem}></CertificationBriefCard>
//         </>
//       )}

//       <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
//         <Table.Root size="sm" stickyHeader>
//           <Table.Header>
//             <Table.Row bg="bg.subtle">
//               <Table.ColumnHeader>Product</Table.ColumnHeader>
//               <Table.ColumnHeader>Category</Table.ColumnHeader>
//               <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
//             </Table.Row>
//           </Table.Header>

//           <Table.Body>
//             {items.map((item) => (
//               <Table.Row
//                 key={item.id}
//                 onClick={(item) => openApprovalCard(item)}
//               >
//                 <Table.Cell>{item.name}</Table.Cell>
//                 <Table.Cell>{item.category}</Table.Cell>
//                 <Table.Cell textAlign="end">{item.price}</Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Root>
//       </Table.ScrollArea>
//     </>
//   );
// }

// export default CertificationApprovalComponent;

import { useEffect, useState } from "react";
import CertificationBriefCard from "./CertificationBriefCard";

export default function CertificationApprovalComponent() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setItems([
      { id: 1, name: "AWS Architect", employeeName: "Anirudh" },
      { id: 2, name: "Azure Admin", employeeName: "Sneha" },
    ]);
  }, []);

  return (
    <>
      {selected && (
        <CertificationBriefCard
          item={selected}
          onClose={() => setSelected(null)}
          onApprove={() => setSelected(null)}
          onReject={() => setSelected(null)}
        />
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-left">Certification</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelected(item)}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <td className="px-6 py-4">{item.employeeName}</td>
                <td className="px-6 py-4">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
