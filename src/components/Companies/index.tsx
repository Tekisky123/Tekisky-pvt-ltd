import Image from "next/image";
import companyData from "./companyData";
import { company } from "@/types/company";
import SectionTitle from "../Common/SectionTitle";

const Company = () => {
  return (
    <section className="">
      <p style={{textAlign:"center"}}>Happy Placements</p>
      <SectionTitle
        title="Our Prestigious Companies"
        paragraph="Our Candidates Are Placed in Following Companies."
        center
      />
      <div className="container">
        <div className="company-container flex flex-wrap items-center justify-center rounded-sm bg-gray-light py-8 dark:bg-gray-dark">
          <div className="image-container  ">
            {companyData.map((Company) => (
              <SingleCompany key={Company.id} Company={Company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;

const SingleCompany = ({ Company }: { Company: company }) => {
  const { href, image, imageLight, name } = Company;

  return (
    <div className="flex h-auto w-60 items-center  justify-center px-3">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-40 w-60"
      >
       <img
  src={imageLight}
  alt={name}
  className="company-logo hidden dark:block"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
<img
  src={image}
  alt={name}
  className="company-logo block dark:hidden"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>

      </a>
    </div>
  );
};
