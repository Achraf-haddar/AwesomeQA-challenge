from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_tickets():
    # Check for a successful response
    response = client.get("/tickets")
    assert response.status_code == 200
    assert response.json()


def test_get_ticket_by_id():
    # Check for a successful response
    response = client.get("/tickets/b70bd307-2051-468c-a73c-044ef9203865")
    assert response.status_code == 200
    assert response.json()

    # Testing a non-existent ticket retrieval
    response = client.get("/tickets/notValidTicketId")
    assert response.status_code == 404


def test_delete_ticket_by_id():
    # Testing deletion of a valid ticket
    response = client.delete("/tickets/b70bd307-2051-468c-a73c-044ef9203865")
    assert response.status_code == 200  # Check for successful deletion

    # Testing deletion of a non-existent ticket
    response = client.delete("/tickets/notValidTicketId")
    assert response.status_code == 404  # Check for a "Not Found" response


def test_get_message_by_id():
    # Testing a valid message retrieval
    response = client.get("/messages/1166945579931275345")
    assert response.status_code == 200  # Check for a successful response
    assert response.json()  # Check if the response contains JSON data

    # Testing a non-existent message retrieval
    response = client.get("/messages/notValidMessageId")
    assert response.status_code == 404  # Check for a "Not Found" response
