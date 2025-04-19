// app/search/page.tsx

export default async function SearchPage({ searchParams }: any) {
    const { title = "", location = "" } = searchParams;
  
    const filter: any = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (location) filter.location = location;
  
    const jobs = await getJobs(filter);
  
    return (
      <div className="p-4">
        <h1 className="text-xl mb-4">Qidiruv natijalari</h1>
        {jobs.length ? (
          jobs.map((job: any) => <JobCard key={job._id} job={job} />)
        ) : (
          <p>Hech qanday ish topilmadi</p>
        )}
      </div>
    );
  }
  