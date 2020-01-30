import React, {useEffect, useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@material-ui/core";
import ReactJson from "react-json-view";

export const ReplyDetailsDialog = (p: {data?: Object; onClose: () => void}) => {
    const [data, setData] = useState(p.data);
    useEffect(() => setData(p.data), [p.data]);

    return (
        <Dialog open={!!data} onClose={p.onClose}>
            <DialogTitle>{"Json response"}</DialogTitle>
            <DialogContent>
                {data && <ReactJson src={data} name={false} enableClipboard={false} displayDataTypes={false} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={p.onClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
