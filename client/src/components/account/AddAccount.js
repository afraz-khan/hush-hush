
export default function AddAccount(){
	return(
		<div className='p-2' >
			<form class="row">
				<div class="col-sm-3">
					<input type="text" class="form-control" placeholder="origin"/>
				</div>
				<div class="col-sm-3">
					<input type="text" class="form-control" placeholder="username"/>
				</div>
				<div class="col-sm-3">
					<input type="password" class="form-control" placeholder="password"/>
				</div>
				<div class="col-auto">
					<button type="submit" class="btn btn-primary">Add Credentials</button>
				</div>
			</form>
		</div>
	)
}