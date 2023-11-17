// Components
import ReserveContainer from "../Components/ReserveContainer";
import ResultTable from "../Components/ResultTable";



const ReservationPage = () => {
  return (
    <>
      <main className="mt-[-10px] pt-[80px] bg-primary-dark h-[100vh] flex gap-[20%] px-[10%]">
        <ResultTable/>
        <ReserveContainer />
      </main>
    </>
  )
};

export default ReservationPage;
