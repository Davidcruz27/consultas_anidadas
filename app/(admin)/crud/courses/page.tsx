import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  
  const courses = await db.creadito.findMany();

  return (
    <div className="p-6 bg-gradient-to-b h-screen from-[#2d3535] relative to-[#0d3732] text-white ">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
