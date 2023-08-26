import { IconName, NamedIconProps } from "interfaces/icons";

import UserIcon from "./UserIcon";
import PasswordIcon from "./PasswordIcon";
import EyeIcon from "./EyeIcon";
import CloseEyeIcon from "./CloseEyeIcon";
import NabarTogglerIcon from "./NabarTogglerIcon";
import PropertyIcon from "./PropertyIcon";
import ReservationIcon from "./ReservationIcon";
import OwnerIcon from "./OwnerIcon";
import LogOutIcon from "./LogOutIcon";
import PlusIcon from "./PlusIcon";
import CloseIcon from "./CloseIcon";
import EditIcon from "./EditIcon";
import EmailIcon from "./EmailIcon";
import PhoneIcon from "./PhoneIcon";
import FilterIcon from "./FilterIcon";
import SearchIcon from "./SearchIcon";
import LocationIcon from "./LocationIcon";
import NameIcon from "./NameIcon";
import CheckIcon from "./CheckIcon";
import TrashIcon from "./TrashIcon";
import SettingsIcon from "./SettingsIcon";
import LogoIcon from "./LogoIcon";
import ClaimIcon from "./ClaimIcon";
import DashboardIcon from "./DashboardIcon";
import ExpensesIcon from "./ExpensesIcon";
import StatementsIcon from "./StatementsIcon";

const Icon = (props: NamedIconProps): JSX.Element => {
	const { size, color, name } = props;

	switch (name) {
		case IconName.USER:
			return <UserIcon size={size} color={color} />;
		case IconName.PASSWORD:
			return <PasswordIcon size={size} color={color} />;
		case IconName.EYE:
			return <EyeIcon size={size} color={color} />;
		case IconName.CLOSED_EYE:
			return <CloseEyeIcon size={size} color={color} />;
		case IconName.NAVBAR_TOGGLER:
			return <NabarTogglerIcon size={size} color={color} />;
		case IconName.PROPERTY:
			return <PropertyIcon size={size} color={color} />;
		case IconName.RESERVATION:
			return <ReservationIcon size={size} color={color} />;
		case IconName.OWNER:
			return <OwnerIcon size={size} color={color} />;
		case IconName.LOGOUT:
			return <LogOutIcon size={size} color={color} />;
		case IconName.PLUS:
			return <PlusIcon size={size} color={color} />;
		case IconName.CLOSE:
			return <CloseIcon size={size} color={color} />;
		case IconName.EDIT:
			return <EditIcon size={size} color={color} />;
		case IconName.EMAIL:
			return <EmailIcon size={size} color={color} />;
		case IconName.PHONE:
			return <PhoneIcon size={size} color={color} />;
		case IconName.FILTER:
			return <FilterIcon size={size} color={color} />;
		case IconName.SEARCH:
			return <SearchIcon size={size} color={color} />;
		case IconName.LOCATION:
			return <LocationIcon size={size} color={color} />;
		case IconName.NAME:
			return <NameIcon size={size} color={color} />;
		case IconName.CHECK:
			return <CheckIcon size={size} color={color} />;
		case IconName.TRASH:
			return <TrashIcon size={size} color={color} />;
		case IconName.SETTINGS:
			return <SettingsIcon size={size} color={color} />;
		case IconName.LOGO:
			return <LogoIcon size={size} color={color} />;
		case IconName.CLAIMS:
			return <ClaimIcon size={size} color={color} />;
		case IconName.DASHBOARD:
			return <DashboardIcon size={size} color={color} />;
		case IconName.EXPENSES:
			return <ExpensesIcon size={size} color={color} />;
		case IconName.STATEMENTS:
			return <StatementsIcon size={size} color={color} />;
		default:
			return <></>;
	}
};

export default Icon;
