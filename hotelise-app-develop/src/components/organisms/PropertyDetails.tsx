import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { PropertyDetailsCard } from "components/molecules";
import { Button } from "components/atoms";

import {
	Property,
	PropertyHotelisePropertyDetailsCategory,
} from "models/properties";
import {
	getPropertyDetailsInfo,
	setPropertyDetails,
} from "state/modules/properties";

import PropertiesClient from "services/api/properties";

import { ButtonSize } from "interfaces/buttons";
import { IconName } from "interfaces/icons";

const Actions = styled.div`
	margin-bottom: 20px;
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(auto-fill, 166px);
`;

const Container = styled.div`
	padding: 15px 70px 0;
`;

const Content = styled.div`
	border-radius: 8px;
	background: #252024;
	padding: 10px;
`;

const PropertyDetails = (): JSX.Element => {
	const [isEditActive, setEditActive] = useState(false);
	const [categories, setCategories] = useState<
		PropertyHotelisePropertyDetailsCategory[]
	>([]);

	const propertyDetails = useSelector(getPropertyDetailsInfo) as Property;

	const dispatch = useDispatch();

	useEffect(() => {
		let detailsCategories =
			propertyDetails?.hotelise?.propertyDetails.categories || [];

		if (!detailsCategories.length) {
			detailsCategories = [
				{
					id: uuid(),
					name: "",
					fields: [
						{
							id: uuid(),
							name: "",
							value: "",
						},
					],
				},
			];
		}

		setCategories(detailsCategories);
	}, [propertyDetails]);

	const filledCategories = useMemo(() => {
		const filteredCategories = categories.filter((category) => {
			const isNameFilled = category.name.length > 0;

			const filledFields = category.fields.filter(
				(field) => field.name.length || field.value.length
			);

			if (isNameFilled || filledFields.length > 0) {
				return category;
			}
		});

		const categoriesWithFilteredFields = filteredCategories.map((category) => {
			const filledFields = category.fields.filter(
				(field) => field.name.length || field.value.length
			);

			return {
				...category,
				fields: filledFields,
			};
		});

		return categoriesWithFilteredFields;
	}, [categories]);

	const currentDetails = useMemo(
		() => (isEditActive ? categories : filledCategories),
		[filledCategories, categories, isEditActive]
	);

	const toggleEdit = () => {
		setEditActive(!isEditActive);
	};

	const handleSave = async () => {
		try {
			const updatedDetails = {
				...propertyDetails,
				hotelise: {
					propertyDetails: {
						categories,
					},
				},
			} as Property;

			dispatch(setPropertyDetails(updatedDetails));
			setEditActive(false);

			// await PropertiesClient.updatePropertyDetails(updatedDetails);
		} catch (error) {
			console.log({ error });
		}
	};

	const handleUpdateDetails = async (
		category: PropertyHotelisePropertyDetailsCategory
	) => {
		const updatedCategories = categories.map((categoryItem) => {
			if (categoryItem.id === category.id) return category;

			return categoryItem;
		});

		setCategories(updatedCategories);
	};

	const handleDeleteCategory = (id: string) => {
		const filteredCategories = categories.filter(
			(categoryItem) => categoryItem.id !== id
		);

		setCategories(filteredCategories);
	};

	const handleCancelEdit = () => {
		setEditActive(false);
	};

	const onEndEditing = (categoryId: string) => {
		const selectedCategory = categories.find(
			(category) => category.id === categoryId
		);

		if (selectedCategory) {
			const lastCategory = categories[categories.length - 1];

			const isLastCategory = lastCategory.id === selectedCategory.id;

			if (isLastCategory) {
				const isCategoryNameFilled = selectedCategory.name.length;
				const filledFields = selectedCategory.fields.filter(
					(field) => field.name.length || field.value.length
				);

				if (isCategoryNameFilled || filledFields.length) {
					const updatedCategories = [
						...categories,
						{
							id: uuid(),
							name: "",
							fields: [
								{
									id: uuid(),
									name: "",
									value: "",
								},
							],
						},
					] as PropertyHotelisePropertyDetailsCategory[];

					setCategories(updatedCategories);
				}
			}
		}
	};

	const renderDetailsCards = () =>
		currentDetails.length ? (
			<Content>
				{currentDetails.map((category, index) => (
					<PropertyDetailsCard
						key={category.id}
						details={category}
						onUpdate={handleUpdateDetails}
						isEditActive={isEditActive}
						onEndEditing={onEndEditing}
						onDelete={handleDeleteCategory}
						isLastItem={index === currentDetails.length - 1}
					/>
				))}
			</Content>
		) : null;

	return (
		<Container>
			<Actions>
				{isEditActive ? (
					<Button
						title="Cancel"
						size={ButtonSize.SM}
						onClick={handleCancelEdit}
						dark
					/>
				) : null}
				<Button
					title={isEditActive ? "Save" : "Edit"}
					size={ButtonSize.SM}
					onClick={isEditActive ? handleSave : toggleEdit}
					dark
					icon={
						!isEditActive
							? {
									name: IconName.EDIT,
									size: 16,
									color: "#ffffff",
							  }
							: null
					}
				/>
			</Actions>
			{renderDetailsCards()}
		</Container>
	);
};

export default PropertyDetails;
