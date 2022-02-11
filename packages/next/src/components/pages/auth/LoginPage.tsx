import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ICredentials, LoginController } from './LoginPage.ctrl';
import { observer } from 'mobx-react';
import { useControllerState } from '@wf/next/src/lib/hooks/useControllerState';

const LoginRoute = () => {
  const [controller] = useControllerState(new LoginController());

  const { register, handleSubmit, watch } = useForm();
  controller.setValues(watch() as ICredentials);

  const handleLogin = (data) => {
    controller.doLogin(data);
  };

  return (
    <>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Sign in with credentials</small>
                </div>
                <Form role="form" onSubmit={handleSubmit(handleLogin)}>
                  <FormGroup className="mb3">
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="new-email"
                        {...register('email', { required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        {...register('password', { required: true })}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    {!!controller.error && <div className="error ql-color-red">{controller.error}</div>}
                    <Button className="my-4" color="info" type="submit">
                      Sign in
                    </Button>
                    <br />
                    {/*<!--<Link href="/auth/register">
                      <Button className="my-4" color="info" type="button">
                        Register
                      </Button>
                    </Link>-->*/}
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default observer(LoginRoute);
