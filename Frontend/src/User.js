import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-navi";

export default function User({userId, username}) {

    return(
        <Card>
            <Card.Body>
                <Card.Title>
                    <Link href={`/users/${userId}`}>{username}</Link>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}