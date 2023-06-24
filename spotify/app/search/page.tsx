import getTitle from "@/actions/getTitle";
import Header from "@/components/Header";
import SearchIn from "@/components/SearchIn";
import SearchContent from "./components/SearchContent";

interface SearchPageProps {
  searchParams: {
    title: string;
  };
}
const Search = async ({ searchParams }: SearchPageProps) => {
  const songs = await getTitle(searchParams.title);
  return (
    <div className="bg-neutral-900 reunded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900 ">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchIn/>
        </div>
      </Header>
      <SearchContent songs={songs}/>
    </div>
  );
};
export default Search;
