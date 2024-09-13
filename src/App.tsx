import React, { useState, useMemo } from 'react';
import { sendPackingRequest } from './api';
import { createRequestBody, getRateTable } from './utils/apiUtils';

import HeroSection from './components/HeroSection';
import Logo from './assets/packwise-high-resolution-logo-transparent.png';
import BoxSelectionSetUp from './components/BoxSelectionSetUp';
import Card from './components/Card';
import PackingForm from './components/PackingForm';
import Modal from './components/Modal';
import BoxTypeSelection from './components/BoxTypeSelection';
import SelectedBoxesTable from './components/SelectedBoxesTable';
import Spinner from './components/Spinner';
import { BoxType } from './types/boxTypes';
import { Item } from './types/item';
import './App.css';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [packingData, setPackingData] = useState<any[]>([]);
  const [selectedCarriers, setSelectedCarrier] = useState<string[]>(['ups']);
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [selectedBoxTypes, setSelectedBoxTypes] = useState<BoxType[]>([]);
  const [showBoxTypeModal, setShowBoxTypeModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [packagingGoal, setPackagingGoal] = useState<string>('lowest-cost');
  const [previousPackingInfo, setPreviousPackingInfo] = useState<{
    items: Item[];
    selectedCarriers: string[];
    selectedBoxTypes: BoxType[];
    comparisonMode: boolean;
    packagingGoal: string;
  }>({
    items: [],
    selectedCarriers: [],
    selectedBoxTypes: [],
    comparisonMode: false,
    packagingGoal: 'lowest-cost',
  });

  const handleCarrierChange = (carriers: string[]) => {
    setSelectedCarrier(carriers);
  };

  const handlePackingType = (goal: string) => setPackagingGoal(goal);

  const handleComparisonModeChange = (enabled: boolean) =>
    setComparisonMode(enabled);

  const handleSelectBoxes = () => {
    setShowBoxTypeModal(true);
  };

  const handleBoxTypeSelect = (boxTypes: BoxType[]) =>
    setSelectedBoxTypes(boxTypes);

  const handleItemsChange = (updatedItems: Item[]) => setItems(updatedItems);

  const handleSubmit = async () => {
    if (comparisonMode && selectedCarriers.length === 0) {
      alert('Please select at least one carrier for comparison.');
      return;
    }

    if (selectedBoxTypes.length === 0) {
      alert('Please select at least one box type.');
      return;
    }

    setLoading(true);

    try {
      const requests = selectedCarriers.map((carrier) => {
        const rateTable = getRateTable(carrier);

        const requestBody = createRequestBody(
          items,
          rateTable,
          selectedBoxTypes,
          packagingGoal
        );

        return sendPackingRequest(requestBody).then((response) => ({
          ...response,
          carrier,
        }));
      });

      const responses = await Promise.all(requests);
      setPackingData(responses);

      setPreviousPackingInfo({
        items,
        selectedCarriers,
        selectedBoxTypes,
        comparisonMode,
        packagingGoal,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPackingInfoSame = useMemo(() => {
    return (
      JSON.stringify(items) === JSON.stringify(previousPackingInfo.items) &&
      JSON.stringify(selectedCarriers) ===
        JSON.stringify(previousPackingInfo.selectedCarriers) &&
      JSON.stringify(selectedBoxTypes) ===
        JSON.stringify(previousPackingInfo.selectedBoxTypes) &&
      comparisonMode === previousPackingInfo.comparisonMode &&
      packagingGoal === previousPackingInfo.packagingGoal
    );
  }, [
    items,
    selectedBoxTypes,
    comparisonMode,
    packagingGoal,
    previousPackingInfo,
  ]);

  const isButtonDisabled = items.length < 1 || isPackingInfoSame;

  return (
    <div className="container">
      {loading && <Spinner />}
      <HeroSection
        logoSrc={Logo}
        missionStatement="Our mission is to revolutionize the packing process by providing businesses and individuals with an intuitive, efficient, and cost-effective solution. We aim to simplify packing decisions, optimize box utilization, and reduce costs while delivering a seamless user experience."
      />
      <div className="packing-form-section">
        <BoxSelectionSetUp
          selectedCarriers={selectedCarriers}
          comparisonMode={comparisonMode}
          packagingGoal={packagingGoal}
          onCarrierChange={handleCarrierChange}
          onComparisonModeChange={handleComparisonModeChange}
          onPackingStyleChange={handlePackingType}
          onSelectBoxes={handleSelectBoxes}
        />
        {selectedBoxTypes.length > 0 && (
          <SelectedBoxesTable
            boxes={selectedBoxTypes}
            onEdit={() => setShowBoxTypeModal(true)}
          />
        )}
        <PackingForm
          items={items}
          onItemsChange={handleItemsChange}
          onSubmit={handleSubmit}
          isButtonDisabled={isButtonDisabled}
        />
      </div>

      <Modal
        isOpen={showBoxTypeModal}
        onClose={() => setShowBoxTypeModal(false)}
      >
        <BoxTypeSelection
          selectedBoxTypes={selectedBoxTypes}
          onBoxTypeSelect={handleBoxTypeSelect}
          onClose={() => setShowBoxTypeModal(false)}
        />
      </Modal>

      {packingData.length > 0 && (
        <div className="card-container">
          {packingData.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
