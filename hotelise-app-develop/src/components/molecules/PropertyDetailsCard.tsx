import styled from "styled-components";
import { ChangeEvent, KeyboardEvent } from "react";
import { v4 as uuid } from "uuid";

import { Icon } from "components/atoms";

import { IconName } from "interfaces/icons";

import {
	PropertyHotelisePropertyDetailsCategory,
	PropertyHotelisePropertyDetailsCategoryField,
} from "models/properties";

import { MAIN_THEME } from "styles/colors";
import {
	FONT_FAMILY_BOLD,
	FONT_FAMILY_MEDIUM,
	FONT_FAMILY_REGULAR,
} from "styles/typography";

const DeleteCategoryButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const DeleteFieldButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InfoItemContent = styled.div``;

const InfoItem = styled.div`
	width: 100%;
	margin-bottom: 15px;
	display: grid;
	grid-template-columns: 1fr 40px;
	gap: 10px;
	padding: 5px 10px;
	position: relative;

	&:hover {
		background: #424242;
	}

	input {
		margin-bottom: 5px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	p {
		margin-bottom: 5px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	&:last-child {
		margin-bottom: 0;
	}
`;

const Input = styled.input<{ fontSize?: string; isTitle?: boolean }>`
	width: 100%;
	font-family: ${FONT_FAMILY_REGULAR}, sans-serif;
	border: none;
	background: transparent;
	border-radius: 4px;
	outline: none;
	height: 20px;
	font-size: ${(props) => props.fontSize || "14px"};
	color: #fff;
	text-transform: ${(props) => (props.isTitle ? "uppercase" : "none")};

	&::placeholder {
		color: #5b575a;
	}
`;

const Value = styled.p`
	width: 100%;
	font-family: ${FONT_FAMILY_REGULAR}, sans-serif;
	height: 20px;
	font-size: 16px;
	color: #fff;
`;

const Label = styled.p`
	color: #9f99bf;
	width: 100%;
	font-family: ${FONT_FAMILY_MEDIUM}, sans-serif;
	font-size: 14px;
`;

const TitleContainer = styled.div`
	margin-bottom: 15px;
	padding: 5px 10px;
	position: relative;
	width: 100%;
	margin-bottom: 15px;
	display: grid;
	grid-template-columns: 1fr 40px;
	gap: 10px;

	&:hover {
		background: #424242;
	}
`;

const Title = styled.p`
	width: 100%;
	font-family: ${FONT_FAMILY_BOLD}, sans-serif;
	font-size: 18px;
	color: #fff;
	height: 20px;
	text-transform: uppercase;
`;

const Container = styled.div`
	padding: 15px;
	position: relative;
	display: flex;
	flex-direction: column;
`;

const BaseButton = styled.button`
	border: 1px solid ${MAIN_THEME.GREY_DARK};
	border-radius: 100%;
	height: 28px;
	width: 28px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
	cursor: pointer;
`;

const DeleteButton = styled(BaseButton)`
	border: 1px solid ${MAIN_THEME.CANCEL_COLOR};
`;

interface Props {
	details: PropertyHotelisePropertyDetailsCategory;
	onUpdate: (category: PropertyHotelisePropertyDetailsCategory) => void;
	isEditActive: boolean;
	onEndEditing: (categoryId: string) => void;
	onDelete: (id: string) => void;
	isLastItem: boolean;
}

const PropertyDetailsCard = (props: Props): JSX.Element => {
	const {
		details,
		onUpdate,
		isEditActive,
		onEndEditing,
		onDelete,
		isLastItem,
	} = props;

	const { fields, name } = details;

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		onUpdate({
			...details,
			name: value,
		});
	};

	const onChangeFieldName = (id: string, newFieldName: string) => {
		const updatedFields = fields.map((fieldItem) => {
			if (fieldItem.id === id) {
				return {
					...fieldItem,
					name: newFieldName,
				};
			}

			return fieldItem;
		});

		onUpdate({
			...details,
			fields: updatedFields,
		});
	};

	const onChangeField = (id: string, value: string) => {
		const updatedFields = fields.map((fieldItem) => {
			if (fieldItem.id === id) {
				return {
					...fieldItem,
					value,
				};
			}

			return fieldItem;
		});

		onUpdate({
			...details,
			fields: updatedFields,
		});
	};

	const handleCreateNewField = () => {
		const updatedFields = [
			...fields,
			{
				id: uuid(),
				name: "",
				value: "",
			},
		];

		onUpdate({
			...details,
			fields: updatedFields,
		});
	};

	const handleDeleteField = (id: string) => {
		const filteredFields = fields.filter((fieldItem) => fieldItem.id !== id);

		onUpdate({
			...details,
			fields: filteredFields,
		});
	};

	const handleKeyDown = (
		event: KeyboardEvent<HTMLInputElement>,
		fieldId?: string,
		index?: number
	) => {
		if (event.key === "Enter") {
			onEndEditing(details.id);

			if (index === fields.length - 1) {
				const isFieldFilled =
					fields[index].name.length || fields[index].value.length;

				if (isFieldFilled) {
					handleCreateNewField();
				}
			}
		}
	};

	const handleOnBlur = () => {
		const lastField = fields[fields.length - 1];
		onEndEditing(details.id);

		if ((lastField && lastField.name.length) || lastField.value.length) {
			handleCreateNewField();
		}
	};

	const renderItem = (
		field: PropertyHotelisePropertyDetailsCategoryField,
		index: number
	) => (
		<InfoItem key={field.id}>
			<InfoItemContent>
				{isEditActive ? (
					<Input
						onKeyDown={(event) => handleKeyDown(event, field.id, index)}
						value={field.name}
						onChange={(event) =>
							onChangeFieldName(field.id, event.target.value)
						}
						placeholder="label"
						onBlur={handleOnBlur}
					/>
				) : (
					<Label>{field.name || "label"}</Label>
				)}
				{isEditActive ? (
					<Input
						onKeyDown={(event) => handleKeyDown(event, field.id, index)}
						value={field.value}
						onChange={(event) => onChangeField(field.id, event.target.value)}
						placeholder="new Field"
						fontSize="16px"
						onBlur={handleOnBlur}
					/>
				) : (
					<Value>{field.value || "new Field"}</Value>
				)}
			</InfoItemContent>
			{index !== fields.length - 1 ? (
				<DeleteFieldButtonContainer>
					{isEditActive ? (
						<DeleteButton onClick={() => handleDeleteField(field.id)}>
							<Icon
								name={IconName.CLOSE}
								size={16}
								color={MAIN_THEME.CANCEL_COLOR}
							/>
						</DeleteButton>
					) : null}
				</DeleteFieldButtonContainer>
			) : null}
		</InfoItem>
	);

	const renderFields = () =>
		fields.map(
			(field: PropertyHotelisePropertyDetailsCategoryField, index: number) =>
				renderItem(field, index)
		);

	const renderTitle = () => (
		<TitleContainer>
			{isEditActive ? (
				<>
					<Input
						onKeyDown={(event) => handleKeyDown(event)}
						value={name}
						onChange={onChangeName}
						placeholder="SECTION"
						fontSize="18px"
						isTitle
						onBlur={() => onEndEditing(details.id)}
					/>
					{!isLastItem && isEditActive ? (
						<DeleteCategoryButtonContainer>
							<DeleteButton onClick={() => onDelete(details.id)}>
								<Icon
									name={IconName.CLOSE}
									size={16}
									color={MAIN_THEME.CANCEL_COLOR}
								/>
							</DeleteButton>
						</DeleteCategoryButtonContainer>
					) : null}
				</>
			) : (
				<Title>{name || "SECTION"}</Title>
			)}
		</TitleContainer>
	);

	return (
		<Container>
			{renderTitle()}
			{renderFields()}
		</Container>
	);
};

export default PropertyDetailsCard;
