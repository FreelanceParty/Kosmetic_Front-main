import Input from "../../components/Input/Input";
import React, {useEffect, useRef, useState} from "react";
import DangerIcon from "../../components/Icons/DangerIcon";
import Select from "../../components/Select/Select";
import TextArea from "../../components/TextArea/TextArea";

const COURIER_DELIVERY_TYPE = 1;
const POST_OFFICE_DELIVERY_TYPE = 2;

const POST_PAYMENT = 1;
const PAYMENT_BY_BANK_TRANSFER = 2;

const apiKey = process.env.REACT_APP_NOVA_POST_API_KEY;

const PersonalInfoSection = ({
	      handleInputChange,
	      formData,
	      setFormData,
      }) => {
	      const apiKey = "c9cfd468abe7e624f872ca0e59a29184";

	      const [deliveryType, setDeliveryType] = useState(0);

	      const [city, setCity] = useState(null);
	      const [warehouse, setWarehouse] = useState(null);
	      const [street, setStreet] = useState(null);

	      const [searchCityText, setSearchCityText] = useState("");
	      const [searchWarehouseText, setSearchWarehouseText] = useState("");
	      const [searchStreetText, setSearchStreetText] = useState("");

	      const [foundCities, setFoundCities] = useState([]);
	      const [foundWarehouses, setFoundWarehouses] = useState([]);
	      const [foundStreets, setFoundStreets] = useState([]);

	      const handleSearchCityTextChange = async () => {
		      try {
			      const requestData = {
				      apiKey:           apiKey,
				      modelName:        "Address",
				      calledMethod:     "searchSettlements",
				      methodProperties: {
					      Page:     "1",
					      CityName: searchCityText,
					      Limit:    "50",
				      },
			      };

			      const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
				      method:  "POST",
				      headers: {
					      Accept:         "application/json, text/plain, */*",
					      "Content-Type": "application/json",
				      },
				      body:    JSON.stringify(requestData),
			      });

			      if (!response.ok) {
				      throw new Error(`HTTP error! Status: ${response.status}`);
			      }
			      const data = await response.json();

			      if (data.success) {
				      const addresses = data.data[0].Addresses;
				      const formatted = addresses.map((c) => ({
					      id:         c.Ref,
					      label:      c.Present,
					      deliveryId: c.DeliveryCity,
				      }));
				      setFoundCities(formatted);
			      }
		      } catch (error) {
			      console.error(error);
		      }
	      };

	      const handleSearchWarehouseTextChange = async () => {
		      try {
			      const requestData = {
				      apiKey:           apiKey,
				      modelName:        "Address",
				      calledMethod:     "getWarehouses",
				      methodProperties: {
					      CityRef:      city.deliveryId,
					      FindByString: searchWarehouseText,
					      Limit:        "100",
				      },
			      };

			      const response = await fetch(
				      "https://api.novaposhta.ua/v2.0/json/Address",
				      {
					      method:  "POST",
					      headers: {
						      Accept:         "application/json, text/plain, */*",
						      "Content-Type": "application/json",
					      },
					      body:    JSON.stringify(requestData),
				      }
			      );

			      if (!response.ok) {
				      throw new Error(`HTTP error! Status: ${response.status}`);
			      }

			      const data = await response.json();
			      if (data.success) {
				      const warehouses = data.data;
				      const formatted = warehouses.map((c) => ({
					      id:    c.SiteKey,
					      label: c.Description,
				      }));
				      setFoundWarehouses(formatted);
			      }
		      } catch (error) {
			      console.error(
				      "Помилка запиту до API Нової Пошти для населених пунктів",
				      error
			      );
		      }
	      };

	      const handleSearchStreetTextChange = async () => {
		      try {
			      const requestData = {
				      apiKey:           apiKey,
				      modelName:        "Address",
				      calledMethod:     "searchSettlementStreets",
				      methodProperties: {
					      StreetName:    searchStreetText,
					      SettlementRef: city.id,
					      Limit:         "100",
				      },
			      };

			      const response = await fetch(
				      "https://api.novaposhta.ua/v2.0/json/Address",
				      {
					      method:  "POST",
					      headers: {
						      Accept:         "application/json, text/plain, */*",
						      "Content-Type": "application/json",
					      },
					      body:    JSON.stringify(requestData),
				      }
			      );

			      if (!response.ok) {
				      throw new Error(`HTTP error! Status: ${response.status}`);
			      }

			      const data = await response.json();
			      if (data.success) {
				      const streets = data.data[0].Addresses;
				      console.log(streets)
				      const formatted = streets.map((c) => ({
					      id:    c.SettlementStreetRef,
					      label: c.Present,
				      }));
				      setFoundStreets(formatted);
			      }
		      } catch (error) {
			      console.error(
				      "Помилка запиту до API Нової Пошти для населених пунктів",
				      error
			      );
		      }
	      };

	      useEffect(() => {
		      if (searchCityText) {
			      handleSearchCityTextChange();
		      }
	      }, [searchCityText]);

	      const handleSearchCityChange = (value) => {
		      setSearchCityText(value);
		      handleSearchCityTextChange(value);
	      };

	      useEffect(() => {
		      if (searchWarehouseText) {
			      handleSearchWarehouseTextChange();
		      }
	      }, [searchWarehouseText]);

	      const handleSearchWarehouseChange = (value) => {
		      setSearchWarehouseText(value);
		      handleSearchWarehouseTextChange(value);
	      };

	      useEffect(() => {
		      if (searchStreetText) {
			      handleSearchStreetTextChange();
		      }
	      }, [searchStreetText]);

	      const handleSearchStreetChange = (value) => {
		      setSearchStreetText(value);
		      handleSearchStreetTextChange(value);
	      };

	      const prevCityRef = useRef();
	      const prevWarehouseRef = useRef();
	      const prevStreetRef = useRef();

	      useEffect(() => {
		      if (city && city.label !== prevCityRef.current?.label) {
			      updateFormData('city', city.label);
			      prevCityRef.current = city;
		      }

		      if (warehouse && warehouse.label !== prevWarehouseRef.current?.label) {
			      updateFormData('warehouse', warehouse.label);
			      prevWarehouseRef.current = warehouse;
		      }

		      if (street && street.label !== prevStreetRef.current?.label) {
			      updateFormData('address', street.label);
			      prevStreetRef.current = street;
		      }
	      }, [city, warehouse, street]);

	      const updateFormData = (key, value) => {
		      setFormData({...formData, [key]: value});
	      }

	      return (
		      <div className="flex flex-col gap-6 w-full min-w-[335px] max-w-[400px]">
			      <div className="flex flex-col gap-4">
				      <div className="font-semibold text-md leading-[11px]">ОСОБИСТА ІНФОРМАЦІЯ</div>
				      <Input
					      type="text"
					      name="firstName"
					      placeholder="Ім'я"
					      value={formData.firstName}
					      onChange={handleInputChange}
					      inputClasses={'h-[43px]'}
				      />
				      <Input
					      type="text"
					      name="lastName"
					      placeholder="Прізвище"
					      value={formData.lastName}
					      onChange={handleInputChange}
					      inputClasses={'h-[43px]'}
				      />
				      <Input
					      type="text"
					      name="number"
					      placeholder="Номер телефону"
					      value={formData.number}
					      onChange={handleInputChange}
					      inputClasses={'h-[43px]'}
				      />
				      <Input
					      type="email"
					      name="email"
					      placeholder="E-mail"
					      value={formData.email}
					      onChange={handleInputChange}
					      inputClasses={'h-[43px]'}
				      />
			      </div>
			      <div className="flex flex-col gap-4">
				      <div className="font-semibold text-md leading-[11px]">ДОСТАВКА</div>
				      <Select
					      title="Варіанти доставки"
					      options={[
						      {id: COURIER_DELIVERY_TYPE, label: "Доставка кур'єром"},
						      {id: POST_OFFICE_DELIVERY_TYPE, label: "Доставка на відділення"},
					      ]}
					      onSelect={(option) => {
						      setDeliveryType(option.id);
						      updateFormData('deliveryMethod', option.label);
					      }}
				      />
				      {deliveryType === COURIER_DELIVERY_TYPE && (
					      <>
						      <Select
							      title="Місто*"
							      options={foundCities}
							      isWithSearch
							      onSearchChange={handleSearchCityChange}
							      onSelect={(option) => setCity(option)}
						      />
						      <Select
							      title="Вулиця*"
							      options={foundStreets}
							      isWithSearch
							      onSearchChange={handleSearchStreetChange}
							      onSelect={(option) => setStreet(option)}
							      isDisabled={city === null}
						      />
						      <Input
							      type="text"
							      name="building"
							      placeholder="Будинок*"
							      value={formData.building}
							      onChange={(e) => updateFormData('building', e.target.value)}
							      inputClasses={'h-[43px]'}
						      />
						      <Input
							      type="text"
							      name="apartment"
							      placeholder="Квартира"
							      value={formData.apartment}
							      onChange={(e) => updateFormData('apartment', e.target.value)}
							      inputClasses={'h-[43px]'}
						      />
					      </>
				      )}
				      {deliveryType === POST_OFFICE_DELIVERY_TYPE && (
					      <>
						      <Select
							      title="Місто*"
							      options={foundCities}
							      isWithSearch
							      onSearchChange={handleSearchCityChange}
							      onSelect={(option) => setCity(option)}
						      />
						      <Select
							      title="Номер відділення*"
							      options={foundWarehouses}
							      isWithSearch
							      onSearchChange={handleSearchWarehouseChange}
							      onSelect={(option) => setWarehouse(option)}
							      isDisabled={city === null}
						      />
					      </>
				      )}
				      <div className="flex gap-[10px]">
					      <DangerIcon classes="mt-1 min-h-[14px] min-w-[14px]"/>
					      <div className="text-md">
						      Доставка за рахунок покупця за тарифами перевізника!
					      </div>
				      </div>
			      </div>
			      <div className="flex flex-col gap-4">
				      <div className="font-semibold text-md leading-[11px]">ОПЛАТА</div>
				      <Select
					      title="Варіанти оплати"
					      options={[
						      {id: POST_PAYMENT, label: "Післяплата"},
						      {id: PAYMENT_BY_BANK_TRANSFER, label: "Оплата за реквізитами"},
					      ]}
					      onSelect={(option) => {
						      updateFormData('paymentMethod', option.label);
					      }}
				      />
			      </div>
			      <div className="flex flex-col gap-4">
				      <div className="font-semibold text-md leading-[11px]">КОМЕНТАР ДО ЗАМОВЛЕННЯ</div>
				      <TextArea
					      placeholder="Текст повідомлення"
					      onChange={(e) => {
						      const value = e.target.value.trim();
						      updateFormData('comments', value === '' ? null : value);
					      }}
				      />
			      </div>
		      </div>
	      );
      }
;
export default PersonalInfoSection;