import React, { useState, useMemo } from 'react';
import { sendPackingRequest } from './api';
import { createRequestBody } from './utils/apiUtils';

import HeroSection from './components/HeroSection';
import Logo from './assets/packwise-high-resolution-logo-transparent.png';
import BoxSelection from './components/BoxSelectionSetUp';
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
  const [boxProvider, setBoxProvider] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [selectedBoxTypes, setSelectedBoxTypes] = useState<BoxType[]>([]);
  const [showBoxTypeModal, setShowBoxTypeModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [packagingGoal, setPackagingGoal] = useState<string>('lowest-cost');
  const [previousPackingInfo, setPreviousPackingInfo] = useState<{
    items: Item[];
    boxProvider: string[];
    selectedBoxTypes: BoxType[];
    comparisonMode: boolean;
    packagingGoal: string;
  }>({
    items: [],
    boxProvider: [],
    selectedBoxTypes: [],
    comparisonMode: false,
    packagingGoal: 'lowest-cost',
  });

  const handleCarrierChange = (carriers: string[]) => {
    if (boxProvider.includes('custom') && !carriers.includes('custom')) {
      setSelectedBoxTypes([]);
      setShowBoxTypeModal(false);
    }
    setBoxProvider(carriers);
  };

  const handlePackingType = (goal: string) => setPackagingGoal(goal);

  const handleComparisonModeChange = (enabled: boolean) =>
    setComparisonMode(enabled);

  const handleOtherCarrierSelected = () => setShowBoxTypeModal(true);

  const handleBoxTypeSelect = (boxTypes: BoxType[]) =>
    setSelectedBoxTypes(boxTypes);

  const handleItemsChange = (updatedItems: Item[]) => setItems(updatedItems);

  const handleSubmit = async () => {
    if (comparisonMode && boxProvider.length === 0) {
      alert('Please select at least one provider for comparison.');
      return;
    }

    if (boxProvider.includes('custom') && selectedBoxTypes.length === 0) {
      alert('Please select at least one box type.');
      return;
    }

    setLoading(true);

    try {
      const requests = boxProvider.map((provider) => {
        const isOther = provider === 'custom';
        const requestBody = createRequestBody(
          items,
          provider,
          isOther ? selectedBoxTypes : [],
          packagingGoal
        );
        return sendPackingRequest(requestBody).then((response) => ({
          ...response,
          provider,
        }));
      });

      const responses = await Promise.all(requests);
      setPackingData(responses);
      setPreviousPackingInfo({
        items,
        boxProvider,
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
      JSON.stringify(boxProvider) ===
        JSON.stringify(previousPackingInfo.boxProvider) &&
      JSON.stringify(selectedBoxTypes) ===
        JSON.stringify(previousPackingInfo.selectedBoxTypes) &&
      comparisonMode === previousPackingInfo.comparisonMode &&
      packagingGoal === previousPackingInfo.packagingGoal
    );
  }, [
    items,
    boxProvider,
    selectedBoxTypes,
    comparisonMode,
    packagingGoal,
    previousPackingInfo,
  ]);

  const isButtonDisabled = items.length < 1 || isPackingInfoSame;

  return (
    <div className="container">
      {loading && <Spinner />} {/* Show spinner when loading */}
      <HeroSection
        logoSrc={Logo}
        missionStatement="Our mission is to empower businesses and individuals by providing a cutting-edge, intuitive platform that streamlines the packing process..."
      />
      <div className="packing-form-section">
        <BoxSelection
          boxProvider={boxProvider}
          comparisonMode={comparisonMode}
          packagingGoal={packagingGoal}
          onBoxProviderChange={handleCarrierChange}
          onComparisonModeChange={handleComparisonModeChange}
          onCustomProviderSelected={handleOtherCarrierSelected}
          onPackingStyleChange={handlePackingType}
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
      {boxProvider.includes('custom') && (
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
      )}
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
