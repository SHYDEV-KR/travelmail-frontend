import { Button, IconButton } from "@chakra-ui/button";
import {
	FormControl,
	FormLabel,
	FormHelperText,
} from "@chakra-ui/form-control";
import {
	Box,
	Divider,
	Flex,
	Heading,
	HStack,
	Text,
	VStack,
} from "@chakra-ui/layout";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
} from "@chakra-ui/react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
	Input,
	InputGroup,
	InputLeftElement,
	Tag,
	TagCloseButton,
	TagLabel,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import {
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
} from "@chakra-ui/react";
/* ====== */
/* ====== */
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
	AiOutlineCalendar,
	AiOutlineCheckCircle,
	AiOutlinePlus,
} from "react-icons/ai";
/* ====== */
/* ====== */
import { useForm } from "react-hook-form";
/* ====== */
/* ====== */
import React, { useEffect, useRef, useState } from "react";
/* ====== */
/* ====== */
import MarginBox from "../components/MarginBox";
import { formatDate } from "../lib/utils";

export default function Order() {
	const [dates, setDates] = useState({
		departureDate: "",
		arrivalDate: "",
		dueDate: "",
	});
	const [emails, setEmails] = useState([]);
	const [submittedForm, setSubmittedForm] = useState({
		departureDate: "",
		departureCity: "",
		arrivalDate: "",
		arrivalCity: "",
		currencyCode: "",
		dueDate: "",
		emails: [],
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const emailInput = useRef();
	const departureDateInput = useRef();
	const arrivalDateInput = useRef();
	const dueDateInput = useRef();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const onChangeCalendar = (dates) => {
		if (dates) {
			const [firstDate, secondDate] = dates;
			setDates((dates) => {
				return {
					...dates,
					dueDate: formatDate(new Date(firstDate.toJSON().split("T")[0])),
					departureDate: formatDate(firstDate),
					arrivalDate: formatDate(secondDate),
				};
			});
		}
	};

	const onChangeDueCalendar = (date) => {
		if (date && typeof date !== "string") {
			setDates((dates) => {
				return {
					...dates,
					dueDate: formatDate(date),
				};
			});
		}
	};

	useEffect(() => {
		if (departureDateInput) {
			departureDateInput.current.value = dates.departureDate;
			setValue("departureDate", dates.departureDate);
		}
		if (arrivalDateInput) {
			arrivalDateInput.current.value = dates.arrivalDate;
			setValue("arrivalDate", dates.arrivalDate);
		}
		if (dueDateInput) {
			dueDateInput.current.value = dates.dueDate;
			setValue("dueDate", dates.dueDate);
		}
	}, [dates]);

	const onSubmit = ({
		departureDate,
		departureCity,
		arrivalDate,
		arrivalCity,
		currencyCode,
		dueDate,
		emails,
	}) => {
		setSubmittedForm({
			departureDate: departureDate,
			departureCity: departureCity,
			arrivalDate: arrivalDate,
			arrivalCity: arrivalCity,
			currencyCode: currencyCode,
			dueDate: dueDate,
			emails: emails,
		});
		onOpen();
	};

	const emailTags = emails.map((email) => (
		<Tag key={email} bg={"twitter.100"}>
			<TagLabel>{email}</TagLabel>
			<TagCloseButton
				onClick={() => {
					emails.splice(emails.indexOf(email), 1);
					setEmails([...emails]);
					setValue("emails", [...emails]);
				}}
			/>
		</Tag>
	));

	const ConfirmModal = ({ isOpen, onClose, submittedForm }) => {
		const {
			departureCity,
			arrivalCity,
			departureDate,
			arrivalDate,
			currencyCode,
			dueDate,
			emails,
		} = submittedForm;
		const [checked, setChecked] = useState(false);

		return (
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>????????????</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack
							bg={"gray.50"}
							padding={3}
							alignItems={"flex-start"}
							borderRadius={5}
							mb={3}
						>
							<HStack w={"100%"} justifyContent={"space-between"}>
								<Heading fontSize={"xl"}>
									{departureCity}-{arrivalCity}
								</Heading>
								<Tag fontWeight={"bold"} bg={"twitter.50"}>
									{currencyCode}/KRW
								</Tag>
							</HStack>
							<HStack w={"100%"} justifyContent={"space-between"}>
								<Text>
									<strong>
										{departureDate}~{arrivalDate}
									</strong>
								</Text>
							</HStack>
							<Divider />
							<Text>
								<strong>????????? ({emails.length})</strong>
							</Text>
							<VStack alignItems={"flex-start"}>
								{emails.map((email) => (
									<Tag bg="twitter.50" key={email}>
										{email}
									</Tag>
								))}
							</VStack>
							<Divider />
							<Text fontWeight={"bold"}>????????? ??????</Text>
							<Tag bg={"twitter.50"}>{dueDate}??????</Tag>
						</VStack>
						<VStack>
							<List spacing={1} fontSize={"md"} mx={3} alignSelf={"flex-start"}>
								<ListItem>
									<ListIcon as={AiOutlineCheckCircle} color="green.500" />
									???????????? ?????? ?????? 12?????? ?????? ???????????????.
								</ListItem>
								<ListItem>
									<ListIcon as={AiOutlineCheckCircle} color="green.500" />
									?????? ????????? ?????? ????????? ????????? ??? ????????????.
								</ListItem>
								<ListItem>
									<ListIcon as={AiOutlineCheckCircle} color="green.500" />
									??????????????? ?????? 9?????? ???????????? ???????????????.
								</ListItem>
								<Checkbox
									pt={3}
									onChange={() => {
										setChecked((checked) => (checked = !checked));
									}}
								>
									??? ????????? ?????????????????? ???????????? ?????????????????????.
								</Checkbox>
							</List>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="red" mr={3} onClick={onClose}>
							??????
						</Button>
						<Button variant="solid" colorScheme="twitter" disabled={!checked}>
							?????? ?????? &rarr;
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		);
	};

	return (
		<MarginBox minH={"100vh"}>
			<VStack paddingTop={125} paddingBottom={75}>
				<Heading>?????? ?????? ?????????</Heading>
				<VStack spacing={5}>
					<FormControl>
						<FormLabel>?????????</FormLabel>
						<Select
							isInvalid={Boolean(errors.departureCity?.message)}
							placeholder="???????????? ???????????????."
							required
							{...register("departureCity", {
								required: "???????????? ???????????????.",
							})}
						>
							<option value={"??????"}>??????</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>?????????</FormLabel>
						<Select
							isInvalid={Boolean(errors.arrivalCity?.message)}
							placeholder="???????????? ???????????????."
							required
							{...register("arrivalCity", { required: "???????????? ???????????????." })}
						>
							<option value="????????????">????????????</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>?????? ??????</FormLabel>

						<Popover placement="auto">
							<PopoverTrigger>
								<HStack>
									<InputGroup>
										<InputLeftElement
											pointer="true"
											pointerEvents="none"
											children={<AiOutlineCalendar />}
										/>
										<Input
											isInvalid={Boolean(errors.departureDate?.message)}
											placeholder="?????????"
											variant="filled"
											required
											{...register("departureDate", {
												required: "???????????? ???????????????.",
											})}
											onChange={(e) => console.log("hi")}
											ref={departureDateInput}
										/>
									</InputGroup>
									<Text>~</Text>
									<InputGroup>
										<InputLeftElement
											pointer="true"
											pointerEvents="none"
											children={<AiOutlineCalendar />}
										/>
										<Input
											isInvalid={Boolean(errors.arrivalDate?.message)}
											placeholder="?????????"
											variant="filled"
											required
											{...register("arrivalDate", {
												required: "???????????? ???????????????.",
											})}
											ref={arrivalDateInput}
										/>
									</InputGroup>
								</HStack>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverHeader>?????? ??????</PopoverHeader>
								<PopoverBody>
									<Calendar
										onChange={onChangeCalendar}
										prev2Label={null}
										next2Label={null}
										minDetail="month"
										minDate={new Date()}
										maxDate={
											new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)
										}
										selectRange
									/>
								</PopoverBody>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormControl>
						<FormLabel>?????? ??????</FormLabel>
						<Select
							isInvalid={Boolean(errors.currencyCode?.message)}
							placeholder="???????????? ????????? ??????????????????."
							required
							{...register("currencyCode", {
								required: "???????????? ????????? ??????????????????.",
							})}
						>
							<option value="JPY">JPY/KRW</option>
							<option value="USD">USD/KRW</option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel>?????? ?????? ??????</FormLabel>
						<Popover placement="auto">
							<PopoverTrigger>
								<InputGroup>
									<InputLeftElement
										pointer="true"
										pointerEvents="none"
										children={<AiOutlineCalendar />}
									/>
									<Input
										isInvalid={Boolean(errors.dueDate?.message)}
										placeholder="?????????"
										variant="filled"
										required
										{...register("dueDate", {
											required: "???????????? ????????? ???????????? ???????????????.",
										})}
										ref={dueDateInput}
									/>
								</InputGroup>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverHeader>?????? ??????</PopoverHeader>
								<PopoverBody>
									<Calendar
										onChange={onChangeDueCalendar}
										prev2Label={null}
										next2Label={null}
										minDetail="month"
										minDate={new Date()}
										maxDate={
											dates.departureDate
												? new Date(dates.departureDate)
												: new Date()
										}
									/>
								</PopoverBody>
							</PopoverContent>
						</Popover>
						<FormHelperText>???????????? ????????? ??????????????? ??????????</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>????????? ??????</FormLabel>
						<HStack>
							<Input
								type="email"
								isInvalid={Boolean(errors.emails?.message)}
								{...register("emails", {
									required: "????????? ?????? ???????????? ??????????????????.",
								})}
								ref={emailInput}
							/>
							<IconButton
								icon={<AiOutlinePlus />}
								onClick={() => {
									const emailInputValue = emailInput.current.value;
									if (emailInputValue && !emails.includes(emailInputValue)) {
										setEmails([...emails, emailInputValue]);
										setValue("emails", [...emails, emailInputValue]);
									}
									emailInput.current.value = "";
								}}
							></IconButton>
						</HStack>
						<FormHelperText>
							???????????? ?????? ??? ???????????? ??? ????????????.
						</FormHelperText>
					</FormControl>
					<VStack>{emailTags}</VStack>

					<Button
						type={"submit"}
						onClick={handleSubmit(onSubmit)}
						width={"100%"}
						colorScheme="twitter"
					>
						???????????? ?????? &rarr;
					</Button>
					<ConfirmModal
						isOpen={isOpen}
						onClose={onClose}
						submittedForm={submittedForm}
					/>
				</VStack>
			</VStack>
		</MarginBox>
	);
}
