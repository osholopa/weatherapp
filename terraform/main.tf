terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)
  project     = var.project
  region      = var.region
  zone        = var.zone
}

resource "google_compute_address" "static" {
  name = "ipv4-address"
}

resource "google_compute_firewall" "default" {
  name    = "weatherapp-firewall"
  network = "default"

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["80", "22"]
  }
  source_ranges = ["0.0.0.0/0"]
  source_tags   = ["web"]
}


resource "google_compute_instance" "vm_instance" {
  name         = "weatherapp-vm"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  metadata = {
    ssh-keys = "${var.ssh_username}:${file(var.ssh_pub_key_path)}"
  }

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.static.address
    }
  }
}
