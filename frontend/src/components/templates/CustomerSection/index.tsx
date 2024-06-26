import { CustomerCard } from "@/components/molecules/CustomerCard";
import { Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

export const CustomerSection = observer(() => {
	return (
		<Grid
			gridColumnGap={"24px"}
			gridRowGap={"24px"}
			maxW={"1440px"}
			w={"full"}
			p={"40px 108px"}
			gap={"24px"}
			margin={"0 auto"}
		>
			<CustomerCard />
		</Grid>
	);
});
