// const SmartButton = (await import("remoteLib/SmartButton")).default;
import dynamic from 'next/dynamic'

const SmartButton = dynamic(() => import("remoteLib/SmartButton"), {
  ssr: false,
});

const Page = () => {
  return (
    <div>
      NextJS now can use remote dependencies on both (client and server) !!
      <SmartButton />
    </div>
  );
};

export default Page;
