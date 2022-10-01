import React, { useEffect, useState } from "react";
import Column from "../components/Layout/Column";
import { withTheme } from "@emotion/react";
import { TextField } from "@mui/material";
import Header from "../components/Header";
import { sendTransaction, onEVMEventHook, retrieveUserBalance } from "../services/web3.js";
import {useSnackbar} from 'notistack'
import { LoadingButton } from '@mui/lab';
import {notistackOptions} from "../utils/notistackUtils.js"
import { useAccount } from "wagmi";
import { ethers } from "ethers";

const FaucetPage = () => {

    const [destAddress, setDestAddress] = useState("");
    const [amount, setAmount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(-1);
    const { enqueueSnackbar } = useSnackbar();
    const { address } = useAccount();

    const onButtonClick = async () => {
        // parseUnits convert 1 eth to 1000000000000000000 (wei)
        await sendTransaction(destAddress, ethers.utils.parseUnits(amount.toString()));
        setLoading(true);
        onEVMEventHook(destAddress, (amount) => {
            setLoading(false);
            enqueueSnackbar(`${ethers.utils.formatEther(amount)} token minted`, notistackOptions.SUCCESS);
            updateUserBalance();
        });
    }

    const updateUserBalance = async () => {
        const b = await retrieveUserBalance(address);
        setBalance(ethers.utils.formatEther(b));
    }

    useEffect(() => {
        if (!address) {
            return;
        }
        updateUserBalance();
        // eslint-disable-next-line
    }, [address]);

    return (
        <Column width='100vw'>
            <Header />
            <Column
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                width="100%"
                height="100%"
                minHeight="75vh"
                alignItems="center"
                justifyContent="center"
            >
                {balance !== -1 && <div>Your CTKN balance: {balance.toString()}</div>}
                <br/>
                <TextField
                    id="input-address"
                    label="Address"
                    size="small"
                    value={destAddress}
                    onChange={(v) => {setDestAddress(v.target.value)}}
                />
                <TextField
                    id="input-amount"
                    label="Amount"
                    type="number"
                    size="small"
                    value={amount}
                    onChange={(v) => {setAmount(v.target.value)}}
                />
                <LoadingButton variant="contained" onClick={onButtonClick} style={{marginTop: "8px"}} loading={loading}>
                    Send me CTKN
                </LoadingButton>
            </Column>
        </Column>
    );

}

export default withTheme(FaucetPage);