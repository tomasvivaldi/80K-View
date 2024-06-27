import React, { useState } from 'react';

import ChartModal from './ChartModal';
import { MiniatureChart } from './MiniatureChart';
import { CategoryChart } from './CategoryChart';

interface ChartWithPreviewProps {
  data: Category[];
}

const ChartWithPreview: React.FC<ChartWithPreviewProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }


  return (
    <div>
      <MiniatureChart data={data} onClick={openModal} />
      {isModalOpen && (
        <ChartModal onClose={closeModal}>
          <CategoryChart data={data} />
        </ChartModal>
      )}
    </div>
  );
};

export default ChartWithPreview;
