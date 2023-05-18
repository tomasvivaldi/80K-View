import React from 'react';

type CopyrightProps = {
  company: string;
};

const Copyright = ({ company }: CopyrightProps) => {
  const year = new Date().getFullYear();
  return (
    <section id="copyright">
      <p className="text-center text-xs my-6 text-gray-500">
        © {company} {year}. All Rights Reserved
      </p>
    </section>
  );
};

export default Copyright;
