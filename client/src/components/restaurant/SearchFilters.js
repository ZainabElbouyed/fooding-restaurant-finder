import React from 'react';

const SearchFilters = ({ filters, setFilters, onSearch, onReset }) => {
  // Ajouter ou retirer une valeur pour les filtres multi-sélection
  const handleMultiSelectChange = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    const valueArray = Array.isArray(currentValues) ? currentValues : currentValues ? [currentValues] : [];

    if (valueArray.includes(value)) {
      const newValues = valueArray.filter(v => v !== value);
      setFilters({ ...filters, [filterName]: newValues });
    } else {
      setFilters({ ...filters, [filterName]: [...valueArray, value] });
    }
  };

  // Vérifie si une valeur est sélectionnée
  const isSelected = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    const valueArray = Array.isArray(currentValues) ? currentValues : currentValues ? [currentValues] : [];
    return valueArray.includes(value);
  };

  // Compter le nombre de filtres actifs
  const countActiveFilters = () => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) count += value.length;
      else if (value && value !== '' && value !== false) count += 1;
    });
    return count;
  };

  const activeFiltersCount = countActiveFilters();

  // Catégories
  const categories = [
    'Bar','Brunch','Café','Cuisine traditionnelle','Glacier','Pizzeria','Restaurant américain',
    'Restaurant asiatique','Restaurant de fruits de mer','Restaurant de grillades','Restaurant de poisson',
    'Restaurant de poulet','Restaurant espagnol','Restaurant familial','Restaurant fast food','Restaurant français',
    'Restaurant hollandais','Restaurant international','Restaurant italien','Restaurant libanais','Restaurant marocain',
    'Restaurant méditerranéen','Restaurant occidental','Restaurant surinamais-javanais','Restaurant syrien','Restaurant turc','Sandwicherie','Traiteur','Vins'
  ];

  // Ambiances
  const ambiances = [
    'Cadre agréable','Branché','Décontracté','Calme','Traditionnel','Romantique','Animé','Haut de gamme','Nocturne','Élégant'
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/20 p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/10">
        <h3 className="text-2xl font-bold text-dark flex items-center gap-2">
          Filtres
        </h3>
        {activeFiltersCount > 0 && (
          <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Type de repas */}
        <FilterSection
          label="Type de repas"
          options={['Petit-Déjeuner','Déjeuner','Dîner']}
          filterName="type"
          isSelected={isSelected}
          onChange={handleMultiSelectChange}
        />

        {/* Niveau de prix */}
        <FilterSection
          label="Niveau de prix"
          options={['$','$$','$$$','$$$$']}
          filterName="priceLevel"
          isSelected={isSelected}
          onChange={handleMultiSelectChange}
          optionLabels={{'$':'$ Économique','$$':'$$ Moyen','$$$':'$$$ Cher','$$$$':'$$$$ Luxe'}}
        />

        {/* Catégorie */}
        <FilterSection
          label="Catégorie"
          options={categories}
          filterName="category"
          isSelected={isSelected}
          onChange={handleMultiSelectChange}
        />

        {/* Ambiance */}
        <FilterSection
          label="Ambiance"
          options={ambiances}
          filterName="ambiance"
          isSelected={isSelected}
          onChange={handleMultiSelectChange}
        />

        {/* Options spéciales */}
        <div>
          <label className="block text-dark font-bold mb-3 text-sm uppercase tracking-wide">
            Options spéciales
          </label>
          <SpecialOption
            label="Halal"
            emoji="🍷"
            checked={filters.halal}
            onChange={val => setFilters({ ...filters, halal: val })}
          />
          <SpecialOption
            label="Végétarien"
            emoji="🥗"
            checked={filters.Vegetarien || filters.vegetarien}
            onChange={val => setFilters({ ...filters, Vegetarien: val })}
          />
          <SpecialOption
            label="Adapté aux enfants"
            emoji="👶"
            checked={filters.enfant}
            onChange={val => setFilters({ ...filters, enfant: val })}
          />
        </div>

        {/* Boutons */}
        <div className="space-y-3 pt-6 sticky bottom-0 bg-white/95 backdrop-blur-xl pb-2 -mx-6 px-6">
          <button
            onClick={onSearch}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-base hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            🔍 Rechercher
            {activeFiltersCount > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                {activeFiltersCount}
              </span>
            )}
          </button>
          <button
            onClick={onReset}
            className="w-full bg-white border-2 border-primary/30 text-dark py-4 rounded-xl font-bold text-base hover:bg-secondary/50 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant réutilisable pour filtres multiples
const FilterSection = ({ label, options, filterName, isSelected, onChange, optionLabels }) => (
  <div>
    <label className="block text-dark font-bold mb-3 text-sm uppercase tracking-wide">{label}</label>
    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
      {options.map(option => (
        <label key={option} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all duration-300 group">
          <div className="relative">
            <input
              type="checkbox"
              checked={isSelected(filterName, option)}
              onChange={() => onChange(filterName, option)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
              isSelected(filterName, option)
                ? 'bg-gradient-to-r from-primary to-accent border-primary'
                : 'border-primary/30 bg-white group-hover:border-primary/50'
            }`}>
              {isSelected(filterName, option) && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-dark/80 font-medium text-sm group-hover:text-dark transition-colors">
            {optionLabels?.[option] || option}
          </span>
        </label>
      ))}
    </div>
  </div>
);

// Composant réutilisable pour options spéciales
const SpecialOption = ({ label, emoji, checked, onChange }) => (
  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all duration-300 group">
    <div className="relative">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only" />
      <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 flex items-center justify-center ${
        checked ? 'bg-gradient-to-r from-primary to-accent border-primary' : 'border-primary/30 bg-white group-hover:border-primary/50'
      }`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
    <span className="text-dark/80 font-medium text-sm group-hover:text-dark transition-colors flex items-center gap-2">
      <span className="text-lg">{emoji}</span> {label}
    </span>
  </label>
);

export default SearchFilters;
